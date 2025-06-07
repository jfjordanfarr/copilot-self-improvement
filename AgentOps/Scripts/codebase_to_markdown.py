import os
import argparse
import fnmatch
import re
from pathlib import Path

# --- Binary/Non-text file extensions to exclude ---
BINARY_EXTENSIONS = {
    # Images
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.ico', '.webp', '.tiff', '.tif',
    # Videos
    '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v',
    # Audio
    '.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a',
    # Archives
    '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz',
    # Documents
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    # Executables
    '.exe', '.dll', '.so', '.dylib', '.bin', '.app', '.deb', '.rpm', '.msi',
    # Fonts
    '.ttf', '.otf', '.woff', '.woff2', '.eot',
    # Database
    '.db', '.sqlite', '.sqlite3', '.mdb',
    # Other binary formats
    '.iso', '.img', '.dmg', '.toast', '.vcd'
}

def is_binary_file(file_path):
    """Check if a file is likely binary based on extension or content."""
    # Check extension first
    if file_path.suffix.lower() in BINARY_EXTENSIONS:
        return True
    
    # For files without clear extensions, check if content is binary
    try:
        with open(file_path, 'rb') as f:
            chunk = f.read(1024)  # Read first 1KB
            if b'\0' in chunk:  # Null bytes typically indicate binary
                return True
            # Check for high ratio of non-printable characters
            text_chars = bytearray({7,8,9,10,12,13,27} | set(range(0x20, 0x100)) - {0x7f})
            if chunk and len(chunk.translate(None, text_chars)) / len(chunk) > 0.30:
                return True
    except (IOError, OSError):
        # If we can't read the file, assume it might be binary
        return True
    
    return False

# --- Language Mappings (can be extended) ---
LANGUAGE_MAP = {
    '.py': 'python',
    '.js': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.java': 'java',
    '.cs': 'csharp',
    '.fs': 'fsharp',
    '.vb': 'vbnet',
    '.go': 'go',
    '.rs': 'rust',
    '.c': 'c',
    '.cpp': 'cpp',
    '.h': 'cpp', # Often used with C/C++
    '.html': 'html',
    '.css': 'css',
    '.scss': 'scss',
    '.less': 'less',
    '.xml': 'xml',
    '.json': 'json',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.sh': 'bash',
    '.bash': 'bash',
    '.zsh': 'bash',
    '.ps1': 'powershell',
    '.psm1': 'powershell',
    '.psd1': 'powershell',
    '.rb': 'ruby',
    '.php': 'php',
    '.sql': 'sql',
    '.md': 'markdown',
    '.txt': '', # Plain text
    '.gitignore': 'ignore',
    '.gitattributes': 'ignore',
    'Dockerfile': 'dockerfile',
    # Add more as needed
}

def get_language_hint(file_path):
    """Gets a language hint for Markdown code blocks based on file extension."""
    suffix = file_path.suffix.lower()
    if suffix in LANGUAGE_MAP:
        return LANGUAGE_MAP[suffix]
    # Handle files with no extension but specific names
    if file_path.name in LANGUAGE_MAP:
        return LANGUAGE_MAP[file_path.name]
    return '' # Default to plain text or no hint

def parse_gitignore(gitignore_path):
    """Parses a .gitignore file and returns a list of patterns."""
    patterns = []
    if not gitignore_path.is_file():
        return patterns
    try:
        with open(gitignore_path, 'r', encoding='utf-8', errors='ignore') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    patterns.append(line)
    except Exception as e:
        print(f"Warning: Could not read gitignore {gitignore_path}: {e}")
    return patterns

def get_gitignore_patterns(directory):
    """Finds all .gitignore files from the directory up to the root and returns patterns."""
    all_patterns = {} # Dict[Path, List[str]] storing patterns per gitignore file dir
    current_dir = Path(directory).resolve()
    root = Path(current_dir.anchor)

    while True:
        gitignore_file = current_dir / '.gitignore'
        if gitignore_file.is_file():
            if gitignore_file.parent not in all_patterns: # Avoid redundant parsing if nested
                 patterns = parse_gitignore(gitignore_file)
                 if patterns:
                     print(f"DEBUG: Found .gitignore: {gitignore_file} with {len(patterns)} patterns")
                     all_patterns[gitignore_file.parent] = patterns # Store patterns relative to their dir
        if current_dir == root:
            break
        parent = current_dir.parent
        if parent == current_dir: # Should not happen, but safeguard
             break
        current_dir = parent
    return all_patterns


def matches_gitignore(relative_path_posix, gitignore_patterns_map):
    """Checks if a relative path matches any gitignore patterns from relevant directories."""
    path_obj = Path(relative_path_posix)
    # Check patterns from parent directories downwards
    for gitignore_dir, patterns in gitignore_patterns_map.items():
        try:
            # Check if the file path is within or below the gitignore_dir
            # We need the relative path of the file *to the gitignore dir*
            relative_to_gitignore_dir = path_obj.relative_to(gitignore_dir.relative_to(Path('.').resolve())).as_posix()
        except ValueError:
            # The file is not under this gitignore's directory scope
            continue

        for pattern in patterns:
            # Basic fnmatch implementation (doesn't cover all gitignore nuances like !)
            # Handle directory matching (pattern ending with /)
            is_dir_pattern = pattern.endswith('/')
            match_pattern = pattern.rstrip('/')

            # A pattern without '/' can match a file or directory
            # A pattern with '/' only matches a directory
            # Need to check against the path string and potentially its parts

            # Simplistic matching for now:
            if fnmatch.fnmatch(relative_to_gitignore_dir, match_pattern) or \
               fnmatch.fnmatch(relative_to_gitignore_dir, match_pattern + '/*') or \
               any(fnmatch.fnmatch(part, match_pattern) for part in Path(relative_to_gitignore_dir).parts): # Match any segment
                # Refine directory matching
                if is_dir_pattern:
                     # Check if the match is actually for a directory segment
                     if Path(relative_to_gitignore_dir).is_dir() or (match_pattern in Path(relative_to_gitignore_dir).parts): # Heuristic
                         print(f"DEBUG: Gitignored (DIR pattern '{pattern}'): {relative_path_posix}")
                         return True
                else:
                    print(f"DEBUG: Gitignored (pattern '{pattern}'): {relative_path_posix}")
                    return True
    return False


def main():
    parser = argparse.ArgumentParser(description="Dump codebase structure and content to a Markdown file.")
    parser.add_argument("-s", "--source", required=True, help="Source directory to scan.")
    parser.add_argument("-o", "--output", required=True, help="Output Markdown file path.")
    parser.add_argument("-e", "--exclude", nargs='*', default=['.git', '.vscode', '.idea', 'bin', 'obj', 'node_modules'],
                        help="Directory names to exclude (exact match). Example: bin obj")
    parser.add_argument("-ep", "--exclude-patterns", nargs='*', 
                        default=[
                            '**/Examples/*',
                            '**/Library-References/*',
                            '**/Archive/*'
                            ],
                        help="Glob patterns for paths to exclude (relative to source). Example: '**/temp/*' '*.log'")
    parser.add_argument("-f", "--force", action="store_true", help="Overwrite output file if it exists.")
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose output.")

    args = parser.parse_args()

    source_dir = Path(args.source).resolve()
    output_file = Path(args.output).resolve()
    exclude_dirs = set(args.exclude)
    exclude_patterns = args.exclude_patterns # Store the patterns
    verbose = args.verbose

    if not source_dir.is_dir():
        print(f"Error: Source directory '{source_dir}' not found or is not a directory.")
        return

    if output_file.exists() and not args.force:
        print(f"Error: Output file '{output_file}' already exists. Use --force to overwrite.")
        return

    # Ensure output directory exists
    output_file.parent.mkdir(parents=True, exist_ok=True)

    print(f"Source Directory: {source_dir}")
    print(f"Output File: {output_file}")
    print(f"Exclude Dirs: {', '.join(exclude_dirs)}")
    print(f"Exclude Patterns: {', '.join(exclude_patterns)}") # Print the patterns

    # --- Gitignore Handling ---
    print("Collecting .gitignore patterns...")
    gitignore_map = get_gitignore_patterns(source_dir)
    print(f"Found patterns in {len(gitignore_map)} .gitignore files.")

    processed_count = 0
    skipped_excluded_dir = 0
    skipped_gitignore = 0
    skipped_read_error = 0
    skipped_output_file = 0 # Added counter for the output file itself
    skipped_pattern_exclude = 0 # Added counter for pattern excludes

    try:
        with open(output_file, 'w', encoding='utf-8') as md_file:
            md_file.write(f"# Code Dump: {source_dir.name}\n\n")
            md_file.write(f"*Generated on: {Path().cwd().name}*\n\n") # Simple timestamp marker

            for root, dirs, files in os.walk(source_dir, topdown=True):
                current_dir_path = Path(root)
                relative_dir_path = current_dir_path.relative_to(source_dir)

                # --- Directory Exclusion ---
                # Modify dirs in-place to prevent os.walk from descending
                original_dirs = list(dirs) # Copy before filtering
                dirs_to_remove_std_exclude = {d for d in dirs if d in exclude_dirs or d.startswith('.')}
                dirs_to_remove_gitignore = set()
                dirs_to_remove_pattern = set() # Set for pattern excluded dirs

                dirs[:] = [d for d in dirs if d not in dirs_to_remove_std_exclude]

                # Filter remaining dirs based on gitignore and patterns
                for d in list(dirs): # Iterate over a copy while potentially modifying dirs
                    dir_rel_path = relative_dir_path / d
                    dir_rel_path_posix = dir_rel_path.as_posix().replace('\\', '/')

                    # Check exclude patterns
                    matched_by_exclude_pattern = False
                    offending_pattern_for_log = "" # For logging
                    for current_pattern_original in exclude_patterns:
                        pattern_to_test_against_dir = current_pattern_original
                        if pattern_to_test_against_dir.endswith('/*'):
                            pattern_to_test_against_dir = pattern_to_test_against_dir[:-2] # e.g., from "**/foo/*" to "**/foo"
                        elif pattern_to_test_against_dir.endswith('/'):
                            pattern_to_test_against_dir = pattern_to_test_against_dir[:-1] # e.g., from "**/foo/" to "**/foo"
                        
                        # Initial match attempt
                        current_match_result = fnmatch.fnmatch(dir_rel_path_posix, pattern_to_test_against_dir)

                        # If the initial match fails, and the pattern is like "**/dirname",
                        # and the path is a simple name (no slashes, e.g. "dirname"),
                        # then try matching against the "dirname" part of the pattern.
                        if not current_match_result and \
                           pattern_to_test_against_dir.startswith('**/') and \
                           '/' not in dir_rel_path_posix:
                            simplified_target_pattern = pattern_to_test_against_dir[3:] # Remove "**/"
                            if verbose:
                                print(f"DEBUG_FNMATCH_DIR (Alt Attempt): Testing dir='{dir_rel_path_posix}' vs simplified_target_pattern='{simplified_target_pattern}' from original_pattern='{current_pattern_original}'")
                            if fnmatch.fnmatch(dir_rel_path_posix, simplified_target_pattern):
                                current_match_result = True
                        
                        if verbose:
                            # Log the original test attempt's details clearly
                            print(f"DEBUG_FNMATCH_DIR: Testing dir_path='{dir_rel_path_posix}' against pattern_to_test='{pattern_to_test_against_dir}' (original_pattern='{current_pattern_original}'). Final Match Result: {current_match_result}")
                        
                        if current_match_result:
                            matched_by_exclude_pattern = True
                            offending_pattern_for_log = current_pattern_original
                            break
                    
                    if matched_by_exclude_pattern:
                        dirs_to_remove_pattern.add(d)
                        if verbose: 
                            print(f"Skipping excluded pattern directory: {dir_rel_path_posix} (due to pattern: '{offending_pattern_for_log}')")
                        skipped_pattern_exclude += 1
                        continue # Skip gitignore check if already pattern-excluded

                    # Check gitignore
                    if matches_gitignore(dir_rel_path_posix, gitignore_map):
                        dirs_to_remove_gitignore.add(d)
                        # Verbose reporting for gitignore is handled within matches_gitignore
                        # if verbose: print(f"Skipping gitignored directory: {dir_rel_path_posix}")
                        skipped_gitignore += 1 # Count handled here

                # Report skipped standard excludes
                for skipped_dir in dirs_to_remove_std_exclude:
                     if verbose: print(f"Skipping standard excluded directory: {(relative_dir_path / skipped_dir).as_posix()}")
                     skipped_excluded_dir += 1

                # Update dirs list for os.walk
                dirs[:] = [d for d in dirs if d not in dirs_to_remove_gitignore and d not in dirs_to_remove_pattern]


                # --- File Processing ---
                for filename in files:
                    file_path = current_dir_path / filename
                    relative_path = file_path.relative_to(source_dir)
                    relative_path_posix = relative_path.as_posix().replace('\\', '/') # Use forward slashes for gitignore

                    # --- Skip the output file itself ---
                    if file_path == output_file:
                        if verbose: print(f"Skipping output file itself: {relative_path_posix}")
                        skipped_output_file += 1
                        continue

                    # --- Skip binary files ---
                    if is_binary_file(file_path):
                        if verbose: print(f"Skipping binary file: {relative_path_posix}")
                        skipped_read_error += 1  # Count as read error for simplicity
                        continue

                    # Check standard exclusions first (e.g., if a file is in an excluded dir name like 'bin')
                    if any(part in exclude_dirs for part in relative_path.parts):
                        if verbose: print(f"Skipping excluded file (in standard excluded path): {relative_path_posix}")
                        skipped_excluded_dir +=1 # Count doesn't distinguish file/dir well here
                        continue

                    # Check exclude patterns
                    offending_pattern_for_file_log = ""
                    file_matches_exclude_pattern = False
                    for current_pattern in exclude_patterns:
                        if fnmatch.fnmatch(relative_path_posix, current_pattern):
                            offending_pattern_for_file_log = current_pattern
                            file_matches_exclude_pattern = True
                            break
                    
                    if file_matches_exclude_pattern:
                        if verbose: 
                            print(f"Skipping excluded pattern file: '{relative_path_posix}' (due to pattern: '{offending_pattern_for_file_log}')")
                        skipped_pattern_exclude += 1
                        continue

                    # Check gitignore
                    if matches_gitignore(relative_path_posix, gitignore_map):
                        if verbose: print(f"Skipping gitignored file: {relative_path_posix}")
                        skipped_gitignore += 1
                        continue

                    # Read and write content
                    if verbose: print(f"Processing file: {relative_path_posix}")
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f_content:
                            content = f_content.read()

                        lang_hint = get_language_hint(file_path)
                        md_file.write(f"## {relative_path_posix}\n\n")
                        md_file.write(f"```{lang_hint}\n")
                        md_file.write(content)
                        md_file.write(f"\n```\n\n")
                        processed_count += 1

                    except Exception as e:
                        print(f"Warning: Could not read file {file_path}: {e}")
                        skipped_read_error += 1

    except Exception as e:
        print(f"Error writing to output file {output_file}: {e}")
        return

    print("\nScript finished.")
    print(f" - Files dumped: {processed_count}")
    total_skipped = skipped_excluded_dir + skipped_gitignore + skipped_read_error + skipped_output_file + skipped_pattern_exclude # Add pattern skips to total
    print(f" - Total items skipped: {total_skipped}")
    print(f"   - Skipped (Standard Exclude Dir/Path): {skipped_excluded_dir}")
    print(f"   - Skipped (Exclude Pattern): {skipped_pattern_exclude}") # Added summary line for patterns
    print(f"   - Skipped (.gitignore): {skipped_gitignore}")
    print(f"   - Skipped (Output File): {skipped_output_file}")
    print(f"   - Skipped (Read Error): {skipped_read_error}")
    print(f"Output written to: {output_file}")

if __name__ == "__main__":
    main()
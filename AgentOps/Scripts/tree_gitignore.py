import os
import argparse
from pathlib import Path
import pathspec

def find_gitignore(start_path):
    """Find the .gitignore file in the start_path or its parents."""
    current_path = Path(start_path).resolve()
    while True:
        gitignore_path = current_path / '.gitignore'
        if gitignore_path.is_file():
            return gitignore_path
        parent = current_path.parent
        if parent == current_path: # Reached root
            return None
        current_path = parent

def load_gitignore_patterns(gitignore_path):
    """Load patterns from a .gitignore file."""
    if not gitignore_path:
        return []
    with open(gitignore_path, 'r') as f:
        return [line for line in f.read().splitlines() if line and not line.strip().startswith('#')]

def build_tree(directory, spec, gitignore_root, prefix=''):
    """Recursively build the directory tree string."""
    current_dir_path = Path(directory).resolve()
    try:
        # Get absolute paths first
        items_abs = sorted(list(current_dir_path.iterdir()), key=lambda x: (x.is_file(), x.name.lower()))
    except PermissionError:
        print(f"{prefix}└── [ACCESS DENIED] {current_dir_path.name}/")
        return
    except FileNotFoundError:
        print(f"Error: Directory not found: {current_dir_path}")
        return

    # Filter items based on .gitignore spec using paths relative to gitignore_root
    filtered_items_abs = [
        item_abs for item_abs in items_abs
        if not spec.match_file(str(item_abs.relative_to(gitignore_root)))
    ]

    pointers = ['├── ' for _ in range(len(filtered_items_abs) - 1)] + ['└── ']

    for pointer, item_abs_path in zip(pointers, filtered_items_abs):
        print(f"{prefix}{pointer}{item_abs_path.name}{'/' if item_abs_path.is_dir() else ''}")

        if item_abs_path.is_dir():
            extension = '│   ' if pointer == '├── ' else '    '
            # Pass gitignore_root down recursively
            build_tree(item_abs_path, spec, gitignore_root, prefix=prefix + extension)

def main():
    parser = argparse.ArgumentParser(description='List directory contents like tree, respecting .gitignore.')
    parser.add_argument('directory', nargs='?', default='.', help='The directory to list (default: current directory)')
    args = parser.parse_args()

    start_dir = Path(args.directory).resolve()

    if not start_dir.is_dir():
        print(f"Error: '{start_dir}' is not a valid directory.")
        return

    gitignore_path = find_gitignore(start_dir)
    gitignore_root = gitignore_path.parent if gitignore_path else start_dir # Use start_dir if no gitignore found
    patterns = load_gitignore_patterns(gitignore_path)
    # Add default git ignores
    patterns.extend(['.git'])
    # Ensure patterns containing '/' are treated correctly relative to the root
    spec = pathspec.PathSpec.from_lines(pathspec.patterns.GitWildMatchPattern, patterns)

    print(f"{start_dir.name}/ ({gitignore_root})") # Show which root is used
    build_tree(start_dir, spec, gitignore_root)

if __name__ == "__main__":
    main()
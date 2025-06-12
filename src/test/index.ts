// Ref: ../../docs/Specification/Implementations/unit-test-runner-implementation.mdmd.md
import * as path from 'path';
import Mocha from 'mocha'; // Changed from import * as Mocha
import * as glob from 'glob'; // Reverted to import * as glob

export async function run(): Promise<void> {
  console.log('Starting test run...'); // New log
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');
  console.log(`Test root directory: ${testsRoot}`); // New log

  try {
    // Use promise-based glob API
    console.log('Searching for test files...'); // New log
    const files: string[] = await glob.glob('**/**.test.js', { cwd: testsRoot });
    console.log(`Found test files: ${files.join(', ') || 'NONE'}`); // New log
    
    if (files.length === 0) {
      console.warn('No test files found. Exiting.'); // New log
      return Promise.resolve(); // Exit if no files found
    }

    // Add files to the test suite
    files.forEach((f: string) => {
      console.log(`Adding test file: ${path.resolve(testsRoot, f)}`); // New log
      mocha.addFile(path.resolve(testsRoot, f));
    });

    // Run the mocha test
    console.log('Running Mocha tests...'); // New log
    return new Promise((c, e) => {
      mocha.run((failures: number) => {
        console.log(`Mocha run completed. Failures: ${failures}`); // New log
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    });
  } catch (err) {
    console.error('Error during test run:', err); // Modified log
    throw err;
  }
}

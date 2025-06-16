import * as path from 'path';
import * as glob from 'glob';
import Mocha = require('mocha');

export function run(): Promise<void> {
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob.glob('**/**.test.js', { cwd: testsRoot }).then((files) => {
        if (files.length === 0) {
            c();
            return;
        }
        files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));
        try {
            mocha.run((failures: number) => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        } catch (err) {
            console.error(err);
            e(err);
        }
    }).catch((err) => {
        console.error(err);
        e(err);
    });
  });
}
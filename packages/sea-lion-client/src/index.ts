import { program } from 'commander';
import { makeCreateCommand } from './commands/create';
import { makeDeployCommand } from './commands/deploy';
import { makeGCommand } from './commands/generate';
// add version
program.version(require('../package.json').version, '-v --version');
// add create
program.addCommand(makeCreateCommand());
program.addCommand(makeDeployCommand());
program.addCommand(makeGCommand());

program.parse(process.argv);

#!/usr/bin/env node

const program = require('commander');
const chalk = require('colors-cli');
const pkg = require('../package.json');

process.env.HOST = '0.0.0.0';
process.env.PORT = 19870;

program
  .description('Rapid React development, Cli tool for creating react apps.')
  .version(pkg.version, '-v, --version')
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by kkt')
  .option('-c, --clone', 'Use git clone when fetching remote preset')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log('    # create a new project with an official template')
    console.log('    $ kkt init default my-project')
    console.log()
    console.log('    # create a new project straight from a gitlab.net template')
    console.log('    $ kkt init username/repo my-project')
    console.log()
  })
  .action((cmd) => {
    // require('../src/create')(cmd)
  })

program
  .command('build')
  .description('Builds the app for production to the dist folder.')
  .action((cmd) => {
    require('../src/build')(cmd)
  })

program
  .command('start')
  .description('Runs the app in development mode.')
  .on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log('    $ kkt start')
    console.log('    $ kkt start --host 127.0.0.0:8118')
    console.log()
  })
  .action((cmd) => {
    require('../src/start')(cmd)
  })

program
  .command('deploy')
  .description('Push the specified directory to the gh-pages branch.')
  .option('-b, --branch [name]', 'Specify branch.', 'gh-pages')
  .option('-d, --dir [path]', 'Specify the deployment directory.', 'dist')
  .option('-u, --url <dir>', 'Specify repository URL.')
  .action((cmd) => {
    require('../src/deploy')(cmd)
  })

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

program.on('--help', function () {
  console.log('\n  Examples:');
  console.log();
  console.log('    $ kkt start');
  console.log('    $ kkt build');
  console.log();
  console.log();
})

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

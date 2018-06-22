const chalk = require('chalk');

module.exports = () => {
    console.log(chalk.white.bold('Bemu CLI'));
    console.log(chalk.white('CLI Tool to help you quickly generate a NodeJS app or components for it.'));
    console.log(chalk.blue('Author: Belmin Mustajbasic'));
    console.log(chalk.blue('https://mustajbasic.com'));
    console.log(chalk.bold('-------------------------------'))
    console.log(chalk.bold('Possible commands:'))
    console.log(chalk.blue('    bemu-cli help'))
    console.log(chalk.blue('    bemu-cli app {app-name-in-camelcase}'))
    console.log(chalk.blue('    bemu-cli route {route-name-in-camelcase}'))
    console.log(chalk.bold('-------------------------------'))
    console.log(chalk.bold('For further informations and problems you may be having visit:'))
    console.log(chalk.blue.bold('https://github.com/Mustajbasic/bemu-cli'))


}
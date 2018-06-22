const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const GenerateRoute = require('./generate-route');
const Files = require('./file-contents');

module.exports = (name, rootPath) => {
    const regex = /^[A-Za-z][A-Za-z0-9_]*$/;
    const nameLowercase = name.toLowerCase();

    if(!name) {
        console.log('Missing name for app');
        process.exit();
    }
    if(!regex.test(name)) {
        console.log('Route name can only contain letters numbers and undescores. First character has to be a letter.');
        console.log(chalk.red.bold('Regex:' + /^[A-Za-z][A-Za-z0-9_]*$/))
        process.exit();
    }
    if (fs.existsSync(path.join(rootPath, nameLowercase))) {
        console.log('Folder with given name already exists');
        process.exit();
    }
    fs.mkdirSync(path.join(rootPath, nameLowercase));
    fs.mkdirSync(path.join(rootPath, nameLowercase, 'routes'));
    fs.mkdirSync(path.join(rootPath, nameLowercase, 'utils'));
    fs.mkdirSync(path.join(rootPath, nameLowercase, 'models'));

    GenerateRoute('Test', path.join(rootPath, nameLowercase, 'routes'), true);

    fs.writeFileSync(path.join(rootPath, nameLowercase, 'package.json'), Files.getPackageJson(nameLowercase));
    fs.writeFileSync(path.join(rootPath, nameLowercase, 'app.js'), Files.getAppJs());
    fs.writeFileSync(path.join(rootPath, nameLowercase, 'routes', 'index.router.js'), Files.IndexRouter());
    
    console.log(chalk.red.bold('App generated. To install dependencies do:'))
    console.log(chalk.white.bold('cd ' + nameLowercase + ' && npm install'));
    console.log(chalk.red.bold('You start the app with: '))
    console.log(chalk.white.bold('node app'));
    
}
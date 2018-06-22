const cmd = process.argv[2];
const name = process.argv[3];
const rootPath = process.cwd();

const GenerateRoute = require('./command-handlers/generate-route');
const GenerateApp = require('./command-handlers/generate-app');
const Help = require('./command-handlers/help');
module.exports = () => {
    if(!cmd) {
        console.log('Missing command');
        process.exit();
    }
    if (cmd === 'app') {
        GenerateApp(name, rootPath);
    } else if (cmd === 'route') {
        GenerateRoute(name, rootPath);
    } else if (cmd === 'help') {
        Help();
    }
}
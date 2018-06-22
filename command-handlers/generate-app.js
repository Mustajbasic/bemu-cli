const fs = require('fs');
const path = require('path');

const GenerateRoute = require('./generate-route');
const Files = require('./file-contents');

module.exports = (name, rootPath) => {
    const regex = /\b[A-Z][a-z]*([A-Z][a-z]*)*\b/;
    const nameLowercase = name.toLowerCase();

    if(!name) {
        console.log('Missing name for app');
        process.exit();
    }
    if(!regex.test(name)) {
        console.log('Route name can only contain letters in CamelCase');
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
    
    
}
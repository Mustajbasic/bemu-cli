const fs = require('fs');
const path = require('path');
const Files = require('./file-contents');

module.exports = (name, rootPath, demo) => {
    const regex = /\b[A-Z][a-z]*([A-Z][a-z]*)*\b/;
    const nameLowercase = name.toLowerCase();

    if(!name) {
        console.log('Missing name for router');
        process.exit();
    }
    if(!regex.test(name)) {
        console.log('Route name can only contain letters in CamelCase');
        process.exit();
    }
    if (!fs.existsSync(path.join(rootPath, nameLowercase))) {
        fs.mkdirSync(path.join(rootPath, nameLowercase));
    }



    const Controller = name + 'Controller';
    const Router = name + 'Router';
    const Helper = name + 'Helper';
    
    const ControllerFile = nameLowercase + '.controller';
    const HelperFile = nameLowercase + '.helper';
    const RouterFile = nameLowercase + '.router';

    if(!demo) {
        fs.writeFileSync(path.join(rootPath, nameLowercase, RouterFile + '.js'), Files.Router_RouterFileContents(Controller, ControllerFile, Router));
        fs.writeFileSync(path.join(rootPath, nameLowercase, ControllerFile + '.js'), Files.Router_ControllerFileContents(Helper, HelperFile, Controller));
        fs.writeFileSync(path.join(rootPath, nameLowercase, HelperFile + '.js'), Files.Router_HelperFileContents(Helper));
    } else {
        fs.writeFileSync(path.join(rootPath, nameLowercase, RouterFile + '.js'), Files.DemoRouter.Router(Controller, ControllerFile, Router));
        fs.writeFileSync(path.join(rootPath, nameLowercase, ControllerFile + '.js'), Files.DemoRouter.Controller(Helper, HelperFile, Controller));
        fs.writeFileSync(path.join(rootPath, nameLowercase, HelperFile + '.js'), Files.DemoRouter.Helper(Helper));
    }
    
};
const fs = require('fs');
const path = require('path');
const cmd = process.argv[2];
const name = process.argv[3].toLowerCase();
const rootPath = process.cwd();

const regex = /^[a-z]+$/;

module.exports = () => {
    if(!cmd || !name) {
        console.log('Missing parameters');
        process.exit();
        
    }
    if(!regex.test(name)) {
        console.log('Route name can only contain letters');
        process.exit();
    } else if (cmd === 'route') {
        
        if (!fs.existsSync(path.join(rootPath, name))) {
    
            fs.mkdirSync(path.join(rootPath, name));
        } 
    
        const CapitalName = name[0].toUpperCase() + name.slice(1);
    
        const Controller = CapitalName + 'Controller';
        const Router = CapitalName + 'Router';
        const Helper = CapitalName + 'Helper';
        
        const ControllerFile = name + '.controller';
        const HelperFile = name + '.helper';
    
        const ControllerFileContents = 'const ' + Helper + ' = require(\'./'+ HelperFile + '\');\nconst '+ Controller + ' = (() => {\n\n})();\n\nmodule.exports = '+ Controller + ';\n'
        const HelperFileContents = 'const ' + Helper + ' = (() => {\n\n})();\n\nmodule.exports = ' + Helper +';\n';
        const RouterFileContents = 'const express = require(\'expres\');\nconst ' + Controller + ' = require(\'./' + ControllerFile +'\');\nconst ' + Router + ' = express.Router();\n\nmodule.exports = ' + Router + ';\n';
    
        fs.writeFileSync(path.join(rootPath, name, name + '.route.js'), RouterFileContents);
        fs.writeFileSync(path.join(rootPath, name, name + '.controller.js'), ControllerFileContents);
        fs.writeFileSync(path.join(rootPath, name, name + '.helper.js'), HelperFileContents);
    
    }
}
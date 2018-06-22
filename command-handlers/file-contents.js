const json = require('format-json');

const getPackageJson = (name) => {
    let skeleton = {
        "name": name,
        "version": "1.0.0",
        "description": "BemuCLI created this file for you. You may edit this",
        "main": "app.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "Your Name goes here",
        "license": "MIT",
        "dependencies": {
            "body-parser": "^1.18.3",
            "express": "^4.16.3",
            "helmet": "^3.12.1"
        }
    };

    return json.plain(skeleton);
}

const getAppJs = () => {
    return `const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const IndexRouter = require('./routes/index.router');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', IndexRouter);

app.listen(5000, () => {
    console.log('App listening on port 5000');
});
`
}

const IndexRouter = () => {
    return `const express = require('express');
const TestRouter = require('./test/test.router');
const IndexRouter = express.Router();

IndexRouter.use('/test', TestRouter);

module.exports = IndexRouter;
`
}

const Router_ControllerFileContents = (Helper, HelperFile, Controller) => {
    return `const ${Helper} = require('./${HelperFile}');
const ${Controller} = (() => {

})();

module.exports = ${Controller};
`
}

const Router_HelperFileContents = (Helper) => {
    return `const ${Helper} = (() => {

})();

module.exports = ${Helper};
`;
}

const Router_RouterFileContents = (Controller, ControllerFile, Router) => {
    return `
const express = require('express');
const ${Controller} = require('./${ControllerFile}');

const ${Router} = express.Router();

module.exports = ${Router};
`
}

const DemoRouter = (() => {
    const Router = (Controller, ControllerFile, Router) => {
        return `const express = require('express');
const ${Controller} = require('./${ControllerFile}');

const ${Router} = express.Router();

${Router}.get('/', ${Controller}.GET_Test);

module.exports = ${Router};
    `
    };
    const Helper = (Helper) => {
        return `const ${Helper} = (() => {
    const Adder = (a, b) => {
        return a + b;
    }

    return {
        Adder
    };
})();

module.exports = ${Helper};
`;
    };
    const Controller = (Helper, HelperFile, Controller) => {
        return `const ${Helper} = require('./${HelperFile}');
const ${Controller} = (() => {
    const GET_Test = (req, res) => {
        res.json({
            oneandtwo: ${Helper}.Adder(1,2)
        });
    }
    return {
        GET_Test,
    }
})();

module.exports = ${Controller};
`
};
    return {Router, Helper, Controller};
})();
module.exports = {
    getPackageJson,
    getAppJs,
    IndexRouter,
    Router_ControllerFileContents,
    Router_HelperFileContents,
    Router_RouterFileContents,
    DemoRouter

}
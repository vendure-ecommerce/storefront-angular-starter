import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import compression from 'compression';
import * as express from 'express';
import fs from 'fs';
import {join} from 'path';
import 'zone.js/dist/zone-node';

import { GLOBAL_APP_CONFIG_KEY } from './src/app/app.config';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const portArgIndex = process.argv.indexOf('--port');
const portArg = (-1 < portArgIndex) ? process.argv[portArgIndex + 1] : null;
const PORT = portArg || 4000;
const DIST_FOLDER = join(__dirname, 'browser');

const configPath = join(__dirname, 'browser/storefront-config.json');
try {
    console.log('Reading app config from:', configPath);
    const configText = fs.readFileSync(configPath, 'utf-8');
    (global as any)[GLOBAL_APP_CONFIG_KEY] = JSON.parse(configText);
} catch (e) {
    console.error(`Could not read app config!`);
    console.error(e);
    process.exit(1);
}

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
// tslint:disable-next-line:no-var-requires
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP),
    ],
}));
app.use(compression());
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
    maxAge: '1y',
}));

// All regular routes use the Universal engine
app.get('*', (req: any, res: any) => {
    res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

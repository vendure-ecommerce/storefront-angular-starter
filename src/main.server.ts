import { enableProdMode } from '@angular/core';

import { loadAppConfigServer } from './app/app.config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
loadAppConfigServer();

export { AppServerModule } from './app/app.server.module';

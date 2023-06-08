import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        provideClientHydration(),
    ],
})
export class AppServerModule {
}

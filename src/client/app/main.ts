import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {enableProdMode} from "angular2/core";
import {FORM_PROVIDERS} from 'angular2/common';

export enableProdMode();

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, HTTP_BINDINGS, FORM_PROVIDERS
  ]);
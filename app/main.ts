import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';



bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);



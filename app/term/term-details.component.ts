import {Component,OnInit} from 'angular2/core';
import {Term} from './term';
import {Router, RouteParams} from 'angular2/router';

import {IspitiRokComponent} from './ispiti-rok.component';


@Component({
    selector:'term-details',
    templateUrl:'res/html/term/term-details.component.html',
    directives:[IspitiRokComponent]
})
export class TermDetailsComponent implements OnInit{
   
   datumPocetka:string;
   datumZavrsetka:string;
   naziv:string;
   id: number;
   
   

    constructor(private _router:Router, private _routeParams: RouteParams){}
  
ngOnInit():any{
        
        this.datumPocetka = this._routeParams.get("datumPocetka");
        this.datumZavrsetka = this._routeParams.get("datumZavrsetka");
        this.id = +this._routeParams.get("id");
        this.naziv = this._routeParams.get("naziv");
    }
    onBackToTermList(){
        this._router.navigate(['Terms']);
    }
}
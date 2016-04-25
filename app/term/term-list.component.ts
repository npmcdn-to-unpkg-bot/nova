import {Component, OnInit} from 'angular2/core';
import {Term} from './term';
import {TermService} from './term.service';
import {IspitiRokComponent} from './ispiti-rok.component'

import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'term-list',
    template:`
        <h2 style="color :#269;">Spisak rokova u kojima ste bili aktivni: </h2>
        <div style= "width: 80%; height: 80%;">
        <ul >
            <li *ngFor ="#term of terms"
                (click) = "onSelectTerm(term)"
            > 
                <span style = "font-weight:bold">{{term.naziv | uppercase}}: </span> {{term.datumPocetka}}
            </li>
        </ul>
        </div>
        
        
    `,
    styleUrls:['app/term/term.css'],
    directives:[IspitiRokComponent],
    providers: [TermService]
})
export class TermListComponent implements OnInit{
    
    public terms:Term[] =[{id: 1, datumPocetka:null, datumZavrsetka:null,naziv:"ucitavam"}];
    private selectedTerm :Term;
    
    constructor(private _router:Router, private _routeParams: RouteParams, private _termService: TermService){}
    
    public getTerms(){
            this._termService.getTerms().subscribe(
            data =>  this.terms = data,
            err => console.error(err),
            () => console.log('Ucitao Rokove')
        );
    }
    
    onSelectTerm(term){
        this.selectedTerm=term;
        this._router.navigate(['TermDetails',{datumPocetka: this.selectedTerm.datumPocetka,
                                              datumZavrsetka: this.selectedTerm.datumZavrsetka,
                                              id:this.selectedTerm.id,
                                              naziv:this.selectedTerm.naziv}]);
    }
    ngOnInit(){
        this.getTerms();
    }
}
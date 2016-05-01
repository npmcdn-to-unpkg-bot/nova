import {Component, OnInit} from 'angular2/core';
import {ControlGroup} from 'angular2/common';
import {FormBuilder} from 'angular2/common';
import {Validators} from 'angular2/common';

import {Student} from '../student/student';
import {StudentService} from '../student/student.service';

import {Term} from '../term/term';
import {TermService} from '../term/term.service';

import {Predmet} from '../predmet/predmet';
import {PredmetService} from '../predmet/predmet.service';

import {IspitService} from '../ispit/ispit.service';





import {PredmetListComponent} from '../predmet/predmet-list.component';

@Component({
    selector:'prijava-component',
    
    templateUrl :'res/html/prijava/prijava-component.html',
    styleUrls:['res/css/prijava.css'],
    providers: [StudentService,TermService, IspitService, PredmetService],
    directives:[PredmetListComponent]
    
})
export class PrijavaComponent implements OnInit{
    myForm :ControlGroup;
    odsekid:number;
    trenutniPredmet: Predmet= {id:null, naziv:"odaberite", profesor:"ispit"};
    trenutniStudent:Student = { id:0, ime:"ime",prezime:"prezime", godinaStudija:0, odsek:0,kredit:0,pass:"pass", adresa: "adresa"};
    trenutniRok : number =null;
    public terms:Term[] =[{id: 1, datumPocetka:null, datumZavrsetka:null, naziv:"ucitavam"}];
    public potvrda: boolean = false;
    public rokNull :boolean = true;
    
    poruka:string = "";
    
    ime : string;
    constructor(private _formBuilder: FormBuilder, private _studentService: StudentService,
                    private _termService: TermService, private _ispitService: IspitService,
                    private _predmetService: PredmetService){}
    
    public getStud(){
        this._studentService.getStudent().subscribe(
            data =>{this.trenutniStudent = data},
            err =>console.error(err),
            ()=>console.log('ucitao studente')  
        );
        this.odsekid = this.trenutniStudent.id;
      }
      
      onTermSelect(id:number){
          this.trenutniRok = id;
      }
      public getFutureTerms(){
         
            this._termService.getFutureTerms().subscribe(
            data =>  this.terms = data,
            err => console.error(err),
            () => console.log('Ucitao buduce rokove')
        );
    
      }
      updateStudentKredit(){
          this.trenutniStudent.kredit = this.trenutniStudent.kredit - 150;
          this._studentService.postStudent(this.trenutniStudent.ime, 
                    this.trenutniStudent.prezime, this.trenutniStudent.adresa,this.trenutniStudent.kredit,this.trenutniStudent.pass).subscribe(
            data =>  this.ime = data,
            err => console.error(err),
            () => console.log('Uneo novog studenta')
            ); 
      }
      
      onPotvrdi(){
          this._ispitService.putIspit(this.trenutniPredmet.id, 
                    this.trenutniRok, 0, "2015-06-15").subscribe(
            data =>  this.ime = data,
            err => console.error(err),
            () => console.log('Uneo novi ispit')
            ); 
            this.updateStudentKredit();
            this.potvrda=false;
      }
      onOtkazi(){
          this.potvrda=false;
      }
      onPrijaviIspit(){
          this.poruka="";
          console.log('u prijavi ispit!'+ this.trenutniRok);
          if(this.trenutniRok == null){
              this.poruka="Niste odabrali rok";
          }
          else 
          {
            if(this.trenutniStudent.kredit < 150){
              this.poruka="Nemate dovoljno kredita za prijavu";
            }
            else 
                if(this.trenutniPredmet.id==null){
                     this.poruka="Niste odabrali predmet";
                }else{
                    this.potvrda=true;
                }
             }
             
          
         
          /*
          if(this.trenutniStudent.kredit > 150 && this.trenutniRok!=null){
             this.potvrda=true; 
          }*/
          
          
           
      }
      predmetSelected(arg){
          let id = arg; 
          this._predmetService.getPredmet(id).subscribe(
            data =>  this.trenutniPredmet = data,
            err => console.error(err),
            () => console.log('Ucitao predmet')
          );
      }
      
      ngOnInit(){
          this.getStud();
           this.odsekid = this.trenutniStudent.odsek;
          this.getFutureTerms();
         
      }
}
import { Component, OnInit } from '@angular/core';
import {EjercicioDadosService} from "../../services/ejercicio-dados.service";
import {VEndogenasDado} from "../../models/Dado";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-ejercicio-dados',
  templateUrl: './ejercicio-dados.component.html',
  styleUrls: ['./ejercicio-dados.component.css']
})
export class EjercicioDadosComponent implements OnInit {

  generateData: FormGroup;
  hintColor = '#ff0000';
  valid:boolean=false;
  nroSimulaciones:number=30;

  private listVEndogenas: VEndogenasDado[]=[];

  private vEndogenas: VEndogenasDado={
    cJuego: 0,
    gJug: 0,
    nMax: 0
  };

  constructor(private ejercicioDadosService:EjercicioDadosService,
              private fb:FormBuilder,) {
    this.generateData = this.fb.group({
      nMax: ['', Validators.required],
      cJuego: ['', Validators.required],
      gJug: ['', Validators.required]
    });
  }

  ngOnInit(): void {


  }

  generarNumeros() {
    console.log(this.generateData.value);
    if(this.generateData.valid){
      this.valid=false;
      this.vEndogenas = {
        cJuego: this.generateData.value.cJuego,
        gJug: this.generateData.value.gJug,
        nMax: this.generateData.value.nMax
      }

      for(let i=0;i<this.nroSimulaciones;i++){
        this.ejercicioDadosService.ejecutarAlgoritmo(this.vEndogenas);
        let a = this.ejercicioDadosService.vExogenasDado;
        console.log(`${i+1}`);
        console.log(a);
      }


    }else{
      this.valid=true;
    }
  }
}

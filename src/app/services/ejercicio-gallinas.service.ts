import { Injectable } from '@angular/core';
import {VariablesEndogenasGallinas, VariablesExogenasGallinas} from "../models/EjercicioGallinas";

@Injectable({
  providedIn: 'root'
})
export class EjercicioGallinasService {

  NMaxD:number=0;
  PVH:number=0;
  PVP:number=0;


  CNMaxD:number=0;
  rNHG:number=0;
  NHG:number=0;

  cHue:number=0;
  rAEH:number=0;

  NHue:number=0;
  rAEP:number=0;
  NPS:number=0;


  Ib:number=0;
  NHR:number=0;
  NPM:number=0;
  IngP:number=0;

  variablesEndogenasGallinas:VariablesEndogenasGallinas={
    Ib: 0,
    IngP: 0,
    NHR: 0,
    NPM: 0,
    estados: []
  }

  constructor() { }
  public ejecutarAlgoritmo(variablesExogenasGallinas:VariablesExogenasGallinas){
    this.inicializarVariables(variablesExogenasGallinas);
  }
  private inicializarVariables(variablesExogenasGallinas:VariablesExogenasGallinas){
    this.NMaxD=variablesExogenasGallinas.NMaxD;
    this.PVH=variablesExogenasGallinas.PVH;
    this.PVP=variablesExogenasGallinas.PVP;

    this.CNMaxD=0;
    this.cHue=0;
    this.NHue=0;
    this.NPS=0;

    this.Ib=0;
    this.NHR=0;
    this.NPM=0;
    this.IngP=0;

    this.actualizarContadorDias();
  }
  private actualizarContadorDias(){
    this.CNMaxD=this.CNMaxD+1;
    console.log(`DIA: ${this.CNMaxD}`)
    this.generarAleatorioNumeroHuevosGallina();
  }
  private generarAleatorioNumeroHuevosGallina(){
    let numberRandom =Math.random();
    this.rNHG=Number(numberRandom.toFixed(5));
    this.determinarNumeroHuevos();
  }
  private determinarNumeroHuevos(){
    if(0<=this.rNHG && this.rNHG<0.135){
      this.verificarContadorDias();
    }else if(0.135<=this.rNHG && this.rNHG<0.406){
      this.NHG=1;
      this.actualizarContadorHuevos();
    }else if(0.406<=this.rNHG && this.rNHG<0.677){
      this.NHG=2;
      this.actualizarContadorHuevos();
    }else if(0.677<=this.rNHG && this.rNHG<0.857){
      this.NHG=3;
      this.actualizarContadorHuevos();
    }else if(0.857<=this.rNHG && this.rNHG<0.947){
      this.NHG=4;
      this.actualizarContadorHuevos();
    }else if(0.947<=this.rNHG && this.rNHG<0.983){
      this.NHG=5;
      this.actualizarContadorHuevos();
    }else if(0.983<=this.rNHG && this.rNHG<0.995){
      this.NHG=6
      this.actualizarContadorHuevos();
    }else if(0.995<=this.rNHG && this.rNHG<0.998){
      this.NHG=7;
      this.actualizarContadorHuevos();
    }else{
      this.NHG=8;
      this.actualizarContadorHuevos();
    }
  }
  private actualizarContadorHuevos(){
    this.cHue=this.cHue+1;
    this.generarAleatorioEstadoHuevos();
  }
  private generarAleatorioEstadoHuevos(){
    let numberRandom =Math.random();
    this.rAEH=Number(numberRandom.toFixed(5));
    this.determinarEstadoHuevo();
  }
  private determinarEstadoHuevo(){
    if(0<=this.rAEH && this.rAEH<0.2){
      this.actualizarContadorNumeroHuevosRotos();
    }else if(0.2<=this.rAEH && this.rAEH<0.5){
      this.generarAleatorioEstadoPollo();
    }else{
      this.actualizarNumeroHuevos();
    }
  }
  private actualizarContadorNumeroHuevosRotos(){
    this.NHR=this.NHR+1;
    this.verificarContadorDias();
  }
  private generarAleatorioEstadoPollo(){
    let numberRandom =Math.random();
    this.rAEP=Number(numberRandom.toFixed(5));
    this.determinarEstadoPollo();
  }
  private determinarEstadoPollo(){
    if(0<=this.rAEP && this.rAEP<0.2){
      this.actualizarContadorPollosSobrevivientes();
    }else{
      this.actualizarContadorPollosMuertos();
    }
  }
  private actualizarContadorPollosMuertos(){
    this.NPM=this.NPM+1;
    this.verificarContadorHuevos();
  }
  private actualizarContadorPollosSobrevivientes(){
    this.NPS=this.NPS+1;
    this.verificarContadorHuevos();
  }
  private actualizarNumeroHuevos(){
    this.NHue=this.NHue+1
    this.verificarContadorHuevos();
  }
  private verificarContadorHuevos(){
    if(this.cHue==this.NHG){
      this.reestablecerContadorHuevos();
    }else{
      this.actualizarContadorHuevos();
    }
  }
  private reestablecerContadorHuevos(){
    this.cHue=0;
    this.verificarContadorDias();
  }
  private verificarContadorDias(){
    //console.log(`LOS DIAS SON ${this.CNMaxD}`);
    if(this.CNMaxD==this.NMaxD){
      this.calcularIngresoBruto();
    }else{
      this.actualizarContadorDias();
    }
  }
  private calcularIngresoBruto(){
    this.Ib=(this.NHue*this.PVH)+(this.NPS*this.PVP)
    this.calcularIngresoPromedio();
  }
  private calcularIngresoPromedio(){
    this.IngP=this.Ib / this.NMaxD;
    this.generarResultadosFinales();
  }
  private generarResultadosFinales(){
    this.variablesEndogenasGallinas={
      Ib: this.Ib,
      IngP: this.IngP,
      NHR: this.NHR,
      NPM: this.NPM,
      estados: []
    }
    console.log("LOS RESULTADOS SON");
    console.log(this.variablesEndogenasGallinas);
  }


}

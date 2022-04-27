import { Injectable } from '@angular/core';
import {
  HuevosPuestosGallinas,
  VariablesEndogenasGallinas,
  VariablesEstadoGallinas,
  VariablesExogenasGallinas
} from "../models/EjercicioGallinas";

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
  rAEP:number|null=0;
  NPS:number=0;


  Ib:number=0;
  NHR:number=0;
  NPM:number=0;
  IngP:number=0;

  listVEstadoGallinas:VariablesEstadoGallinas[]=[];
  listHuevosPuestosGallinas:HuevosPuestosGallinas[]=[];

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
    //const style = 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)';
    //const style = 'font-weight: bold;';
    //console.log(`%c DIA: ${this.CNMaxD}`,style)
    this.generarAleatorioNumeroHuevosGallina();
  }
  private generarAleatorioNumeroHuevosGallina(){
    let numberRandom =Math.random();
    this.rNHG=Number(numberRandom.toFixed(5));
    this.determinarNumeroHuevos();
  }
  private capturarEstadoDia(){
    const style = 'font-weight: bold;';
    console.log(`%c DIA: ${this.CNMaxD}; ALEATORIO NRO HUEVOS: ${this.rNHG}; NRO HUEVOS: ${this.NHG}`,style)
  }
  private determinarNumeroHuevos(){
    if(0<=this.rNHG && this.rNHG<0.135){
      this.NHG=0;
      this.capturarEstadoDia();
      this.verificarContadorDias();
    }else if(0.135<=this.rNHG && this.rNHG<0.406){
      this.NHG=1;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else if(0.406<=this.rNHG && this.rNHG<0.677){
      this.NHG=2;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else if(0.677<=this.rNHG && this.rNHG<0.857){
      this.NHG=3;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else if(0.857<=this.rNHG && this.rNHG<0.947){
      this.NHG=4;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else if(0.947<=this.rNHG && this.rNHG<0.983){
      this.NHG=5;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else if(0.983<=this.rNHG && this.rNHG<0.995){
      this.NHG=6;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else if(0.995<=this.rNHG && this.rNHG<0.998){
      this.NHG=7;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }else{
      this.NHG=8;
      this.capturarEstadoDia();
      this.actualizarContadorHuevos();
    }
  }
  private actualizarContadorHuevos(){
    this.cHue=this.cHue+1;
    //console.log(`\tALEATORIO: ${this.rNHG}, HUEVOS: ${this.NHG}, contador: ${this.cHue}`);

    this.generarAleatorioEstadoHuevos();
  }
  private generarAleatorioEstadoHuevos(){
    let numberRandom =Math.random();
    this.rAEH=Number(numberRandom.toFixed(5));
    this.determinarEstadoHuevo();
  }
  private determinarEstadoHuevo(){
    this.rAEP=null;
    if(0<=this.rAEH! && this.rAEH!<0.2){
      this.actualizarContadorNumeroHuevosRotos();
    }else if(0.2<=this.rAEH! && this.rAEH!<0.5){
      this.generarAleatorioEstadoPollo();
    }else{
      this.actualizarNumeroHuevos();
    }
  }
  private actualizarContadorNumeroHuevosRotos(){
    this.NHR=this.NHR+1;
    this.verificarContadorHuevos();
  }
  private generarAleatorioEstadoPollo(){
    let numberRandom =Math.random();
    this.rAEP=Number(numberRandom.toFixed(5));
    this.determinarEstadoPollo();
  }
  private determinarEstadoPollo(){
    if(0<=this.rAEP! && this.rAEP!<0.2){
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
    this.NHue=this.NHue+1;
    this.verificarContadorHuevos();
  }
  private verificarContadorHuevos(){

    this.listHuevosPuestosGallinas.push({
      NHue: this.NHue,
      NPS: this.NPS,
      cHue: this.cHue,
      rAEH: this.rAEH,
      rAEP: this.rAEP
    });
    //console.log(this.listHuevosPuestosGallinas);
    console.log(`CONTADOR HUEVOS ${this.cHue}; ALEATORIO ESTADO HUEVO: ${this.rAEH}; HUEVOS PERFECTOS: ${this.NHue}; HUEVOS ROTOS: ${this.NHR}; ALEATORIO ESTADO POLLO: ${this.rAEP}  POLLOS SOBREVIVEN: ${this.NPS}; POLLOS MUEREN: ${this.NPM}`);

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
    this.listVEstadoGallinas.push({
      CNMaxD: this.CNMaxD,
      NHG: this.NHG,
      huevosPuestos: this.listHuevosPuestosGallinas,
      rNHG: this.rNHG
    });
    this.listHuevosPuestosGallinas=[];

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
      estados: this.listVEstadoGallinas
    }
    //console.log("LOS RESULTADOS SON");
    //console.log(this.variablesEndogenasGallinas);
  }


}

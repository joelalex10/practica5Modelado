import { Injectable } from '@angular/core';
import {VEndogenasDado, VExogenasDado} from "../models/Dado";

@Injectable({
  providedIn: 'root'
})
export class EjercicioDadosService {

  cJuego= 0;
  gJug= 0;
  nMax= 0;

  cNMax:number=0;
  sumDados:number=0;
  rDado1:number=0;
  rDado2:number=0;
  dado1:number=0;
  dado2:number=0;

  gNeta= 0;
  nJueGanaCasa= 0;
  pJueGanaCasa= 0;

  vExogenasDado:VExogenasDado={
    gNeta: 0,
    nJueGanaCasa: 0,
    pJueGanaCasa: 0
  }

  constructor() { }

  ejecutarAlgoritmo(endogenas:VEndogenasDado){
    this.inicializarVariables(endogenas);
  }
  inicializarVariables(endogenas:VEndogenasDado){
    this.cJuego= endogenas.cJuego;
    this.gJug= endogenas.gJug;
    this.nMax= endogenas.nMax;

    this.cNMax=0;
    this.sumDados=0;
    this.gNeta= 0;
    this.nJueGanaCasa= 0;
    this.pJueGanaCasa= 0;

    this.aumentarCNMax();
  }
  aumentarCNMax(){
    this.cNMax=this.cNMax+1;
    this.generarRDado1();
  }
  generarRDado1(){
    this.rDado1=Math.random();
    this.generarRDado2();
  }
  generarRDado2(){
    this.rDado2=Math.random();
    this.generarDado1();
  }
  generarDado1(){
    this.dado1 = Math.round(1+(6-1)*this.rDado1);
    this.generarDado2();
  }
  generarDado2(){
    this.dado2 = Math.round(1+(6-1)*this.rDado2);
    this.calculoSumaDados();
  }
  calculoSumaDados(){
    this.sumDados=this.dado1+ this.dado2;
    //console.log(`LANZAMIENTO: ${this.cNMax}, DADO1: ${this.dado1}, DADO2: ${this.dado2}, SUMA: ${this.sumDados}`);
    this.generarResultados();
  }
  generarResultados(){
    if(this.sumDados==7){
      this.calculoGNetaPierdeCasa();
    }else{
      this.calculoGNetaGanaCasa();
    }
  }
  calculoGNetaPierdeCasa(){
    this.gNeta=this.gNeta+this.cJuego-this.gJug;
    this.verificarNumeroLanzamientos();
  }
  calculoGNetaGanaCasa(){
    this.gNeta=this.gNeta+this.cJuego;
    this.actualizarNumeroJuegosGanaCasa();
  }
  actualizarNumeroJuegosGanaCasa(){
    this.nJueGanaCasa=this.nJueGanaCasa+1;
    this.verificarNumeroLanzamientos();
  }
  verificarNumeroLanzamientos(){

    //console.log(`LA GANANCIA NETA ES ${this.gNeta}`);
    if(this.cNMax==this.nMax){
      this.calcularPGanados();
    }else{
      this.aumentarCNMax();
    }
  }
  calcularPGanados(){
    this.pJueGanaCasa=(this.nJueGanaCasa/this.nMax);
    this.generarResultadosFinales();

  }
  generarResultadosFinales(){
    this.vExogenasDado={
      gNeta: this.gNeta,
      nJueGanaCasa: this.nJueGanaCasa,
      pJueGanaCasa: this.pJueGanaCasa
    };

  }
}

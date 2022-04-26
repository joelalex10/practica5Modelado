import { Injectable } from '@angular/core';
import {VExogenasDado, VEstadoDado, VEndogenasDado} from "../models/Dado";

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

  vExogenasDado:VEndogenasDado={
    gNeta: 0,
    nJueGanaCasa: 0,
    pJueGanaCasa: 0,
    estados:[],
  }
  listVEstadoDado:VEstadoDado[]=[];

  constructor() { }

  public ejecutarAlgoritmo(endogenas:VExogenasDado){
    this.inicializarVariables(endogenas);
  }
  private inicializarVariables(endogenas:VExogenasDado){
    this.cJuego= endogenas.cJuego;
    this.gJug= endogenas.gJug;
    this.nMax= endogenas.nMax;
    this.listVEstadoDado = [];

    this.cNMax=0;
    this.sumDados=0;
    this.gNeta= 0;
    this.nJueGanaCasa= 0;
    this.pJueGanaCasa= 0;

    this.aumentarCNMax();
  }
  private aumentarCNMax(){
    this.cNMax=this.cNMax+1;
    this.generarRDado1();
  }
  private generarRDado1(){
    this.rDado1=Math.random();
    this.generarRDado2();
  }
  private generarRDado2(){
    this.rDado2=Math.random();
    this.generarDado1();
  }
  private generarDado1(){
    this.dado1 = Math.round(1+(6-1)*this.rDado1);
    this.generarDado2();
  }
  private generarDado2(){
    this.dado2 = Math.round(1+(6-1)*this.rDado2);
    this.calculoSumaDados();
  }
  private calculoSumaDados(){
    this.sumDados=this.dado1+ this.dado2;
    //console.log(`LANZAMIENTO: ${this.cNMax}, DADO1: ${this.dado1}, DADO2: ${this.dado2}, SUMA: ${this.sumDados}`);
    this.generarResultados();
  }
  private generarResultados(){
    if(this.sumDados==7){
      this.calculoGNetaPierdeCasa();
    }else{
      this.calculoGNetaGanaCasa();
    }
  }
  private calculoGNetaPierdeCasa(){
    this.gNeta=this.gNeta+this.cJuego-this.gJug;
    this.verificarNumeroLanzamientos();
  }
  private calculoGNetaGanaCasa(){
    this.gNeta=this.gNeta+this.cJuego;
    this.actualizarNumeroJuegosGanaCasa();
  }
  private actualizarNumeroJuegosGanaCasa(){
    this.nJueGanaCasa=this.nJueGanaCasa+1;
    this.verificarNumeroLanzamientos();
  }
  private verificarNumeroLanzamientos(){
    this.listVEstadoDado.push({
      cNMax: this.cNMax,
      dado1: this.dado1,
      dado2: this.dado2,
      rDado1: this.rDado1,
      rDado2: this.rDado2,
      sumDados: this.sumDados,
    });
    //console.log(`LA GANANCIA NETA ES ${this.gNeta}`);
    if(this.cNMax==this.nMax){
      this.calcularPGanados();
    }else{
      this.aumentarCNMax();
    }
  }
  private calcularPGanados(){
    this.pJueGanaCasa=(this.nJueGanaCasa/this.nMax);
    this.generarResultadosFinales();

  }
  private generarResultadosFinales(){
    this.vExogenasDado={
      gNeta: this.gNeta,
      nJueGanaCasa: this.nJueGanaCasa,
      pJueGanaCasa: this.pJueGanaCasa,
      estados:this.listVEstadoDado,
    };

  }
}

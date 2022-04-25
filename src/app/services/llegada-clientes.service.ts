import { Injectable } from '@angular/core';
import {VExogenasDado} from "../models/Dado";
import {VEndogenasLlegadaClientes, VExogenasLlegadaClientes} from "../models/LlegadaClientes";

@Injectable({
  providedIn: 'root'
})
export class LlegadaClientesService {

  nMaxH:number=0;
  pCArt:number=0;
  cFijo:number=0
  pVentaArticulo:number=0

  lleClieHora:number=0;
  cNMaxH:number=0;
  artComp:number=0;
  rLleClie:number=0;
  rArtComp:number=0;
  cCli:number=0;

  tArtVend:number=0;
  gNeta:number=0;

  vEndogenasLlegadaClientes:VEndogenasLlegadaClientes={
    estados: [],
    gNeta: 0,
    tArtVend: 0
  }

  constructor() { }

  public ejecutarAlgoritmo(vExogenas:VExogenasLlegadaClientes){
    this.inicializarVariables(vExogenas);
  }
  private inicializarVariables(vExogenas:VExogenasLlegadaClientes){
    this.nMaxH=vExogenas.nMaxH;
    this.pCArt=vExogenas.pCArt;
    this.cFijo=vExogenas.cFijo;
    this.pVentaArticulo=vExogenas.pVentaArticulo;

    this.cNMaxH=0;
    this.tArtVend=0;

    this.incrementarContadorHoras();
  }
  private incrementarContadorHoras(){
    this.cNMaxH=this.cNMaxH+1;
    this.generarAleatorioLlegadaClientes();
  }
  private generarAleatorioLlegadaClientes(){
    this.rLleClie=Math.random();
    this.generarLlegadaClientes();
  }
  private generarLlegadaClientes(){
    this.lleClieHora=Math.round(0+(4-0)*this.rLleClie);
  }
  private verificarLlegadaCliente(){

    if(this.lleClieHora==0){

    }else{
      this.actualizarContadorClientes();
    }
  }
  private actualizarContadorClientes(){
    this.cCli=this.cCli+1;
    this.generarAleatorioArticulosComprados();
  }
  private generarAleatorioArticulosComprados(){
    this.rArtComp=Math.random();
  }
  private AsignatArticulosComprados(){
    if(0<=this.rArtComp && this.rArtComp<0.2){
      this.artComp=0;
      this.verificarContadorClientes();
    }else{
      if(0.2<=this.rArtComp && this.rArtComp<0.5){
        this.artComp=1;
        this.acumularTotalArticulosComprados();
      }else{
        if(0.5<=this.rArtComp && this.rArtComp<0.9){
          this.artComp=2;
          this.acumularTotalArticulosComprados();
        }else{
          this.artComp=3;
          this.acumularTotalArticulosComprados();
        }
      }
    }
  }
  private acumularTotalArticulosComprados(){
    this.tArtVend=this.tArtVend+this.artComp;
    this.verificarContadorClientes();
  }
  private verificarContadorClientes(){
    if(this.cCli==this.lleClieHora){
      this.reiniciarContadorClientes();
    }else{
      this.verificarLlegadaCliente();
    }
  }
  private reiniciarContadorClientes(){
    this.cCli=0;

  }
  private verificarContadorHoras(){
    if(this.cNMaxH==this.nMaxH){
      this.calcularGananciaNeta();
    }else{
      this.incrementarContadorHoras();
    }
  }
  private calcularGananciaNeta(){
    this.gNeta=this.tArtVend*(this.pVentaArticulo - this.pCArt) - this.cFijo;
  }
  private generarResultadosFinales(){
    this.vEndogenasLlegadaClientes={
      estados: [],
      gNeta: this.gNeta,
      tArtVend: this.tArtVend
    }
  }

}

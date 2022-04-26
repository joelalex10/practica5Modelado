import { Injectable } from '@angular/core';
import {VExogenasDado} from "../models/Dado";
import {
  CompraClientes,
  VEndogenasLlegadaClientes,
  VEstadoLlegadaClientes,
  VExogenasLlegadaClientes
} from "../models/LlegadaClientes";

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
  listVEstadoLlegadaClientes:VEstadoLlegadaClientes[]=[];
  listAuxCompraClientes:CompraClientes[]=[];

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
    this.cCli=0;

    this.tArtVend=0;
    this.gNeta=0;

    this.listVEstadoLlegadaClientes=[];

    this.incrementarContadorHoras();
  }
  private incrementarContadorHoras(){
    this.cNMaxH=this.cNMaxH+1;
    //console.log(`CONTADOR: ${this.cNMaxH}`)
    this.generarAleatorioLlegadaClientes();
  }
  private generarAleatorioLlegadaClientes(){
    let numberRandom =Math.random();
    this.rLleClie=Number(numberRandom.toFixed(5));
    this.generarLlegadaClientes();
  }
  private generarLlegadaClientes(){
    this.lleClieHora=Math.round(0+(4-0)*this.rLleClie);
    this.verificarCantidadCliente();
  }
  private verificarCantidadCliente(){

    if(this.lleClieHora==0){
      this.verificarContadorHoras();
    }else{
      this.actualizarContadorClientes();
    }
  }
  private actualizarContadorClientes(){
    this.cCli=this.cCli+1;
    this.generarAleatorioArticulosComprados();
  }
  private generarAleatorioArticulosComprados(){
    let numberRandom =Math.random();
    this.rArtComp=Number(numberRandom.toFixed(5));
    //console.log(`HORA: ${this.cNMaxH}, CLIENTE: ${this.cCli}, RARTC: ${this.rArtComp}`);
    this.asignatArticulosComprados();
  }
  private asignatArticulosComprados(){
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

    this.listAuxCompraClientes.push({
      artComp: this.artComp,
      cCli: this.cCli,
      rArtComp: this.rArtComp,
    });
    if(this.cCli==this.lleClieHora){
      this.reiniciarContadorClientes();
    }else{
      this.verificarCantidadCliente();
    }
  }
  private reiniciarContadorClientes(){
    this.cCli=0;
    //console.log("LISTA DE COMPRAS");
    //console.log(this.listAuxCompraClientes)
    this.verificarContadorHoras();

  }
  private verificarContadorHoras(){
    this.listVEstadoLlegadaClientes.push({
      cNMaxH: this.cNMaxH,
      compraClientes: this.listAuxCompraClientes,
      lleClieHora: this.lleClieHora,
      rLleClie: this.rLleClie
    });
    this.listAuxCompraClientes=[];

    if(this.cNMaxH==this.nMaxH){
      this.calcularGananciaNeta();
    }else{
      this.incrementarContadorHoras();
    }
  }
  private calcularGananciaNeta(){
    this.gNeta=this.tArtVend*(this.pVentaArticulo - this.pCArt) - this.cFijo;
    this.generarResultadosFinales();
  }
  private generarResultadosFinales(){
    this.vEndogenasLlegadaClientes={
      estados: this.listVEstadoLlegadaClientes,
      gNeta: this.gNeta,
      tArtVend: this.tArtVend
    }
  }

}

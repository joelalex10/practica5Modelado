import { Injectable } from '@angular/core';
import {VExogenasDado} from "../models/Dado";
import {VExogenasLlegadaClientes} from "../models/LlegadaClientes";

@Injectable({
  providedIn: 'root'
})
export class LlegadaClientesService {

  nMaxH:number=0;
  pCArt:number=0;
  cFijo:number=0
  pVentaArticulo:number=0

  constructor() { }
  public ejecutarAlgoritmo(vExogenas:VExogenasLlegadaClientes){
    this.inicializarVariables(vExogenas);
  }
  private inicializarVariables(vExogenas:VExogenasLlegadaClientes){
    this.nMaxH=vExogenas.nMaxH;
    this.pCArt=vExogenas.pCArt;
    this.cFijo=vExogenas.cFijo;
    this.pVentaArticulo=vExogenas.pVentaArticulo;

  }

}

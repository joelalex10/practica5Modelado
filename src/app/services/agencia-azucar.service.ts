import { Injectable } from '@angular/core';
import {VariablesEndogenasAgenciaAzucar, VariablesExogenasAgenciaAzucar} from "../models/AgenciaAzucar";

@Injectable({
  providedIn: 'root'
})
export class AgenciaAzucarService {

  private NmaxD:number=0;
  private CoRD:number=0;
  private CuInv:number=0;
  private Cbod:number=0;
  private CUAdq:number=0;
  private PUVAzu:number=0;

  private CNmaxD:number=0;
  private InvAzu:number=0;
  /***private DIns:number=0;*/
  private rDAzu:number=0;
  private DAzu:number=0;//
  private rTiEnt:number=0;
  private TiEnt:number=0;
  private PAzu:number=0;//
  private Ibru:number=0;
  /**private CAdq:number=0;*/
  private CTROD:number=0;
  private CTM:number=0;
  private CTAdq:number=0;

  private GNeta:number=0;
  private CTot:number=0;
  private DInsT:number=0;

  variablesEndogenasAgenciaAzucar:VariablesEndogenasAgenciaAzucar={
    CTot: 0,
    DInsT: 0,
    GNeta: 0
  }

  constructor() { }
  public ejecutarAlgoritmo(exogenas:VariablesExogenasAgenciaAzucar){
    this.inicializarVariables(exogenas);
  }

  private inicializarVariables(exogenas: VariablesExogenasAgenciaAzucar) {

    this.NmaxD=exogenas.NmaxD;
    this.CoRD=exogenas.CoRD;
    this.CuInv=exogenas.CuInv;
    this.Cbod=exogenas.Cbod;
    this.CUAdq=exogenas.CUAdq;
    this.PUVAzu=exogenas.PUVAzu;

    this.CNmaxD=0;
    this.InvAzu=this.Cbod;
    this.CTM=0;
    this.CTAdq=this.CUAdq*this.Cbod;
    this.Ibru=0;
    this.TiEnt=0;
    this.CTROD=this.CoRD;

    this.GNeta=0;
    this.DInsT=0;
    this.actualizarContadorDias();
  }

  private actualizarContadorDias(){
    this.CNmaxD=this.CNmaxD+1;
    console.log(`DIA: ${this.CNmaxD}; INVENTARIO AZUCAR: ${this.InvAzu}`);
    this.verificarModuloContadorDias();
  }

  private verificarModuloContadorDias(){
    if(this.CNmaxD%7 == 0){
      this.realizarPedidoAzucar();
    }else{
      this.verificarTiempoEntrega();
    }
  }

  private realizarPedidoAzucar() {
    this.PAzu = this.Cbod - this.InvAzu;
    this.actualizarCostoTotalAdquisicion();
  }
  private actualizarCostoTotalAdquisicion(){
    this.CTAdq = this.CTAdq + this.PAzu * this.CUAdq;
    this.atualizarCostoTotalReoden();
  }

  private atualizarCostoTotalReoden() {
    this.CTROD = this.CTROD + this.CoRD;
    this.generarAleatorioTiempoEntrega();
  }

  private generarAleatorioTiempoEntrega() {
    let numberRandom =Math.random();
    this.rTiEnt= Number(numberRandom.toFixed(5));
    this.determinarTiempoEntrega();
  }

  private determinarTiempoEntrega() {
    this.TiEnt=Math.round(1+(2)*this.rTiEnt);
    this.verificarInventarioAzucarVacio();
  }

  private verificarInventarioAzucarVacio() {
    if(this.InvAzu>0){
      this.actualizarCostoTotalMantenimiento();
    }else{
      this.verificarContadorDias();
    }
  }

  private actualizarCostoTotalMantenimiento() {
    this.CTM = this.CTM * this.CuInv;
    this.verificarContadorDias();
  }

  private verificarTiempoEntrega() {
    if(this.TiEnt == 0){
      this.generarAleatorioDemandaAzucar();
    }else{
      this.actualizarTiempoEntrega();
    }
  }

  private generarAleatorioDemandaAzucar() {
    let numberRandom =Math.random();
    this.rDAzu= Number(numberRandom.toFixed(5));
    this.generarDemandaAzucar();
  }

  private generarDemandaAzucar() {
    this.DAzu = Math.round(-100*Math.log(1 - this.rDAzu));
    this.verificarInventarioDemandaAzucar();
  }

  private verificarInventarioDemandaAzucar() {
    if(this.InvAzu >= this.DAzu){
      this.actualizarInventarioAzucar();
    }else{
      this.actualizarDemandaInsatisfecha();
    }
  }
  private actualizarInventarioAzucar(){
    this.InvAzu = this.InvAzu - this.DAzu;
    this.actualizarIngresoBruto();
  }

  private actualizarIngresoBruto() {
    this.Ibru = this.Ibru + (this.DAzu * this.PUVAzu);
    this.actualizarCostoTotalMantenimiento();
  }

  private verificarContadorDias() {
    if(this.CNmaxD == this.NmaxD){
      this.calcularCostoTotal();
    }else{
      this.actualizarContadorDias();
    }
  }

  private calcularCostoTotal() {
    this.CTot = this.CTM + this.CTROD + this.CTAdq;
    this.calcularGananciaNeta();
  }

  private calcularGananciaNeta() {
    this.GNeta = this.Ibru - this.CTot;
    this.generarResultadosFinales();
  }

  private actualizarDemandaInsatisfecha() {
    console.log("ACTUALIZANDO");
    this.DInsT = this.DInsT + (this.DAzu - this.InvAzu);
    this.actualizarIngresoBrutoConDemandaInsatisfecha();
  }


  private actualizarIngresoBrutoConDemandaInsatisfecha() {
    this.Ibru = this.Ibru + (this.PUVAzu * this.InvAzu);
    this.reestablecerInventarioAzucar();
  }

  private reestablecerInventarioAzucar() {
    this.InvAzu = 0;
    this.verificarContadorDias();
  }

  private actualizarTiempoEntrega() {
    this.TiEnt = this.TiEnt + 1;
    this.verificarContadorDias();
  }

  private generarResultadosFinales() {
    this.variablesEndogenasAgenciaAzucar = {
      CTot: this.CTot,
      DInsT: this.DInsT,
      GNeta: this.GNeta
    }
  }
}

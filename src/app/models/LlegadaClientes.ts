export interface VExogenasLlegadaClientes{
  nMaxH:number,
  pCArt:number,
  cFijo:number,
  pVentaArticulo:number,
}
export interface VEstadoLlegadaClientes{
  cNMaxH:number,
  rLleClie:number,
  lleClieHora:number,
  compraClientes:CompraClientes[],
}
export interface CompraClientes{
  cCli:number,
  rArtComp:number,
  artComp:number,
}
export interface VEndogenasLlegadaClientes{
  tArtVend:number,
  gNeta:number,
  estados?:VEstadoLlegadaClientes[],
}

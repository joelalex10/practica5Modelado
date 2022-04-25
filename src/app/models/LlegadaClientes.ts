export interface VExogenasLlegadaClientes{
  nMaxH:number,
  pCArt:number,
  cFijo:number,
  pVentaArticulo:number,
}
export interface VEstadoLlegadaClientes{
  lleClieHora:number,
  cNMaxH:number,
  artComp:number,
  rLleClie:number,
  rArtComp:number,
  cCli:number,
}
export interface VEndogenasLlegadaClientes{
  tArtVend:number,
  gNeta:number,
  estados:VEstadoLlegadaClientes[],
}

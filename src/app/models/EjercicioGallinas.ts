export interface VariablesExogenasGallinas {
  NMaxD:number,
  PVH:number,
  PVP:number,
}
export interface VariablesEstadoGallinas{
  CNMaxD:number,
  rNHG:number,
  NHG:number,
  huevosPuestos?:HuevosPuestosGallinas[],
}
export interface HuevosPuestosGallinas{
  cHue:number,
  rAEH:number,
  NHue:number,

  rAEP:number|null,
  NPS:number

  stateNHue:number,
  stateNHR:number,
  stateNPS:number,
  stateNPM:number

}
export interface VariablesEndogenasGallinas{
  Ib:number,
  NHR:number,
  NPM:number,
  IngP:number,
  estados?:VariablesEstadoGallinas[],
}

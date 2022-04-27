export interface VariablesExogenasGallinas {
  NMaxD:number,
  PVH:number,
  PVP:number,
}
export interface VariablesEstadoGallinas{
  CNMaxD:number,
  rNHG:number,
  NHG:number,

  cHue:number,
  rAEH:number,

  NHue:number,
  rAEP:number,
  NPS:number
}
export interface VariablesEndogenasGallinas{
  Ib:number,
  NHR:number,
  NPM:number,
  IngP:number,
  estados:VariablesEstadoGallinas[],
}

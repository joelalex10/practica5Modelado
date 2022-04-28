export interface VariablesExogenasDado {
  nMax:number,
  cJuego:number,
  gJug:number
}
export interface VariablesEstadoDado {
  cNMax:number;
  sumDados:number;
  rDado1:number;
  rDado2:number;
  dado1:number;
  dado2:number;
}
export interface VariablesEndogenasDado {
  gNeta:number,
  nJueGanaCasa:number,
  pJueGanaCasa:number
  estados?:VariablesEstadoDado[],
}


export interface VExogenasDado {
  nMax:number,
  cJuego:number,
  gJug:number
}
export interface VEndogenasDado {
  gNeta:number,
  nJueGanaCasa:number,
  pJueGanaCasa:number
  estados:VEstadoDado[],
}
export interface VEstadoDado{
  cNMax:number;
  sumDados:number;
  rDado1:number;
  rDado2:number;
  dado1:number;
  dado2:number;
}

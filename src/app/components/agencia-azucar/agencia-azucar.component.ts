import { Component, OnInit } from '@angular/core';
import {VariablesExogenasAgenciaAzucar} from "../../models/AgenciaAzucar";
import {AgenciaAzucarService} from "../../services/agencia-azucar.service";

@Component({
  selector: 'app-agencia-azucar',
  templateUrl: './agencia-azucar.component.html',
  styleUrls: ['./agencia-azucar.component.css']
})
export class AgenciaAzucarComponent implements OnInit {

  constructor(
    private agenciaAzucarService:AgenciaAzucarService,
  ) { }

  variablesExogenasAgenciaAzucar:VariablesExogenasAgenciaAzucar={
    CUAdq: 0,
    Cbod: 0,
    CoRD: 0,
    CuInv: 0,
    NmaxD: 0,
    PUVAzu: 0
  }
  ngOnInit(): void {
    this.variablesExogenasAgenciaAzucar={
      CUAdq: 3.5,
      Cbod: 700,
      CoRD: 100,
      CuInv: 0.10,
      NmaxD: 14,
      PUVAzu: 5
    }
    this.agenciaAzucarService.ejecutarAlgoritmo(this.variablesExogenasAgenciaAzucar);
    let result = this.agenciaAzucarService.variablesEndogenasAgenciaAzucar;
    console.log(result);

  }

}

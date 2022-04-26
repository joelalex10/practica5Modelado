import { Component, OnInit } from '@angular/core';
import {LlegadaClientesService} from "../../services/llegada-clientes.service";
import {VExogenasLlegadaClientes} from "../../models/LlegadaClientes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-llegada-clientes',
  templateUrl: './llegada-clientes.component.html',
  styleUrls: ['./llegada-clientes.component.css']
})
export class LlegadaClientesComponent implements OnInit {

  generateData: FormGroup;
  hintColor = '#ff0000';
  valid:boolean=false;
  nroSimulaciones:number=30;

  vExogenasLlegadaClientes:VExogenasLlegadaClientes={
    cFijo: 0,
    nMaxH: 0,
    pCArt: 0,
    pVentaArticulo: 0
  };

  constructor(private llegadaClientesService:LlegadaClientesService,
              private fb:FormBuilder,
              public dialog: MatDialog) {
    this.generateData = this.fb.group({
      cFijo: ['', Validators.required],
      nMaxH: ['', Validators.required],
      pCArt: ['', Validators.required],
      pVentaArticulo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    /**this.vExogenasLlegadaClientes={
      cFijo: 300,
      nMaxH: 5,
      pCArt: 50,
      pVentaArticulo: 75
    }
    console.log('VARIABLES EXOGENAS');
    console.log(this.vExogenasLlegadaClientes);
    this.llegadaClientesService.ejecutarAlgoritmo(this.vExogenasLlegadaClientes);
    console.log('VARIABLES ENDOGENAS');
    console.log(this.llegadaClientesService.vEndogenasLlegadaClientes);**/

  }

  generarNumeros() {
    //console.log(this.generateData.value);
    if(this.generateData.valid){
      this.valid=false;
      this.vExogenasLlegadaClientes = {
        cFijo: this.generateData.value.cFijo,
        nMaxH: this.generateData.value.nMaxH,
        pCArt: this.generateData.value.pCArt,
        pVentaArticulo: this.generateData.value.pVentaArticulo
      }
      for(let i=0;i<30;i++){
        this.llegadaClientesService.ejecutarAlgoritmo(this.vExogenasLlegadaClientes);
        let result = this.llegadaClientesService.vEndogenasLlegadaClientes;
        console.log(result);
      }

        //let vExogena = this.ejercicioDadosService.vExogenasDado;
        //console.log(`${i+1}`);
        //console.log(vExogena);
        //this.listVEndogenas.push(vExogena);
      //this.visualizarResultados();

    }else{
      this.valid=true;
    }
  }
}

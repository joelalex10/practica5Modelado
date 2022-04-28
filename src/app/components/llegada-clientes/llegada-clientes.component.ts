import {Component, OnInit, ViewChild} from '@angular/core';
import {LlegadaClientesService} from "../../services/llegada-clientes.service";
import {
  VEndogenasLlegadaClientes,
  VEstadoLlegadaClientes,
  VExogenasLlegadaClientes
} from "../../models/LlegadaClientes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {
  DialogContentEstadosComponent
} from "../ejercicio-dados/dialog-content-estados/dialog-content-estados.component";
import {DialogClientesEstadosComponent} from "./dialog-clientes-estados/dialog-clientes-estados.component";

@Component({
  selector: 'app-llegada-clientes',
  templateUrl: './llegada-clientes.component.html',
  styleUrls: ['./llegada-clientes.component.css']
})
export class LlegadaClientesComponent implements OnInit {

  generateData: FormGroup;
  hintColor = '#ff0000';
  valid:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VEndogenasLlegadaClientes>;
  displayedColumns = ['TotalArticulosVendidos', 'GananciaNeta', 'Opciones'];
  nroSimulaciones:number=30;

  vExogenasLlegadaClientes:VExogenasLlegadaClientes={
    cFijo: 0,
    nMaxH: 0,
    pCArt: 0,
    pVentaArticulo: 0
  };


  private listVEndogenas: VEndogenasLlegadaClientes[]=[];
  promVEndogenasLlegadaClientes:VEndogenasLlegadaClientes={
    gNeta: 0,
    tArtVend: 0
  }

  constructor(private llegadaClientesService:LlegadaClientesService,
              private fb:FormBuilder,
              public dialog: MatDialog) {
    this.generateData = this.fb.group({
      cFijo: ['', Validators.required],
      nMaxH: ['', Validators.required],
      pCArt: ['', Validators.required],
      pVentaArticulo: ['', Validators.required],
      nroSimulaciones: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  limpiarArreglo(){
    this.listVEndogenas=[];
  }
  generarNumeros() {
    this.limpiarArreglo();
    //console.log(this.generateData.value);
    if(this.generateData.valid){
      this.valid=false;
      this.vExogenasLlegadaClientes = {
        cFijo: this.generateData.value.cFijo,
        nMaxH: this.generateData.value.nMaxH,
        pCArt: this.generateData.value.pCArt,
        pVentaArticulo: this.generateData.value.pVentaArticulo
      }
      for(let i=0;i<this.generateData.value.nroSimulaciones;i++){
        this.llegadaClientesService.ejecutarAlgoritmo(this.vExogenasLlegadaClientes);
        let vExogena = this.llegadaClientesService.vEndogenasLlegadaClientes;
        this.listVEndogenas.push(vExogena);
        console.log(vExogena);
      }
      console.log(this.listVEndogenas);
      this.visualizarResultados();

        //let vExogena = this.ejercicioDadosService.vExogenasDado;
        //console.log(`${i+1}`);
        //console.log(vExogena);
        //this.listVEndogenas.push(vExogena);
      //this.visualizarResultados();

    }else{
      this.valid=true;
    }

  }
  visualizarResultados(){
    this.dataSource= new MatTableDataSource<VEndogenasLlegadaClientes>(this.listVEndogenas)
    this.dataSource.paginator = this.paginator;
    this.CalcularPromedios();
  }

  verLista(estados: VEstadoLlegadaClientes[]) {
    const dialogRef = this.dialog.open(DialogClientesEstadosComponent, {
      width: '1000px',
      data: {estados: estados},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private CalcularPromedios() {

    let promGNeta =0;
    let promTArtVend=0;

    let sumGNeta = 0;
    let sumTArtVend=0;

    for(let i=0;i<this.listVEndogenas.length;i++){
      sumGNeta = sumGNeta+ this.listVEndogenas[i].gNeta;
      sumTArtVend = sumTArtVend + this.listVEndogenas[i].tArtVend;
    }

    promGNeta = sumGNeta / this.listVEndogenas.length;
    promTArtVend = sumTArtVend / this.listVEndogenas.length;

    this.promVEndogenasLlegadaClientes={
      gNeta: Number(promGNeta.toFixed(2)),
      tArtVend: Number(promTArtVend.toFixed(2))
    }
  }
}

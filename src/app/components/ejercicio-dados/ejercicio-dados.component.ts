import {Component, OnInit, ViewChild} from '@angular/core';
import {EjercicioDadosService} from "../../services/ejercicio-dados.service";
import {VariablesEndogenasDado, VariablesEstadoDado, VariablesExogenasDado} from "../../models/Dado";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {DialogContentEstadosComponent} from "./dialog-content-estados/dialog-content-estados.component";

@Component({
  selector: 'app-ejercicio-dados',
  templateUrl: './ejercicio-dados.component.html',
  styleUrls: ['./ejercicio-dados.component.css']
})
export class EjercicioDadosComponent implements OnInit {

  generateData: FormGroup;
  hintColor = '#ff0000';
  valid:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VariablesEndogenasDado>;
  displayedColumns = ['Ganancia', 'JuegosGanados', 'PorcentajeJuegosGanados', 'Opciones'];

  private listVEndogenas: VariablesEndogenasDado[]=[];

  private vExogenas: VariablesExogenasDado={
    cJuego: 0,
    gJug: 0,
    nMax: 0
  };
  promVariablesEndogenasDado:VariablesEndogenasDado={
    gNeta: 0,
    nJueGanaCasa: 0,
    pJueGanaCasa: 0
  }

  constructor(private ejercicioDadosService:EjercicioDadosService,
              private fb:FormBuilder,
              public dialog: MatDialog) {
    this.generateData = this.fb.group({
      nMax: ['', Validators.required],
      cJuego: ['', Validators.required],
      gJug: ['', Validators.required],
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
      this.vExogenas = {
        cJuego: this.generateData.value.cJuego,
        gJug: this.generateData.value.gJug,
        nMax: this.generateData.value.nMax
      }

      for(let i=0;i<this.generateData.value.nroSimulaciones;i++){
        this.ejercicioDadosService.ejecutarAlgoritmo(this.vExogenas);
        let vExogena = this.ejercicioDadosService.vExogenasDado;
        //console.log(`${i+1}`);
        //console.log(vExogena);
        this.listVEndogenas.push(vExogena);
      }
      console.log(this.listVEndogenas);
      this.visualizarResultados();

    }else{
      this.valid=true;
    }
  }
  visualizarResultados(){
    this.dataSource= new MatTableDataSource<VariablesEndogenasDado>(this.listVEndogenas)
    this.dataSource.paginator = this.paginator;
    this.calcularPromedios();
  }


  verLista(vEstados:VariablesEstadoDado[]) {
    const dialogRef = this.dialog.open(DialogContentEstadosComponent, {
      width: '700px',
      data: {estados: vEstados},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private calcularPromedios() {
    let promGNeta= 0;
    let promNJueGanaCasa= 0;
    let promPJueGanaCasa= 0;

    let sumGNeta= 0;
    let sumNJueGanaCasa= 0;
    let sumPJueGanaCasa= 0;

    for(let i=0;i<this.generateData.value.nroSimulaciones;i++){
      sumGNeta = sumGNeta+ this.listVEndogenas[i].gNeta;
      sumNJueGanaCasa = sumNJueGanaCasa + this.listVEndogenas[i].nJueGanaCasa;
      sumPJueGanaCasa = sumPJueGanaCasa + this.listVEndogenas[i].pJueGanaCasa;
    }

    promGNeta= sumGNeta / this.listVEndogenas.length;
    promNJueGanaCasa= sumNJueGanaCasa / this.listVEndogenas.length;
    promPJueGanaCasa= sumPJueGanaCasa / this.listVEndogenas.length;

    this.promVariablesEndogenasDado={
      gNeta: Number(promGNeta.toFixed(2)),
      nJueGanaCasa: Number(promNJueGanaCasa.toFixed(2)),
      pJueGanaCasa: Number(promPJueGanaCasa.toFixed(2))
    }
  }
}

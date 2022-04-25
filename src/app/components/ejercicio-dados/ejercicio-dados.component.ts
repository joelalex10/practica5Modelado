import {Component, OnInit, ViewChild} from '@angular/core';
import {EjercicioDadosService} from "../../services/ejercicio-dados.service";
import {VEndogenasDado, VEstadoDado, VExogenasDado} from "../../models/Dado";
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
  nroSimulaciones:number=30;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VEndogenasDado>;
  displayedColumns = ['Ganancia', 'JuegosGanados', 'PorcentajeJuegosGanados', 'Opciones'];

  private listVEndogenas: VEndogenasDado[]=[];

  private vExogenas: VExogenasDado={
    cJuego: 0,
    gJug: 0,
    nMax: 0
  };

  constructor(private ejercicioDadosService:EjercicioDadosService,
              private fb:FormBuilder,
              public dialog: MatDialog) {
    this.generateData = this.fb.group({
      nMax: ['', Validators.required],
      cJuego: ['', Validators.required],
      gJug: ['', Validators.required]
    });
  }

  ngOnInit(): void {


  }

  generarNumeros() {
    console.log(this.generateData.value);
    if(this.generateData.valid){
      this.valid=false;
      this.vExogenas = {
        cJuego: this.generateData.value.cJuego,
        gJug: this.generateData.value.gJug,
        nMax: this.generateData.value.nMax
      }

      for(let i=0;i<this.nroSimulaciones;i++){
        this.ejercicioDadosService.ejecutarAlgoritmo(this.vExogenas);
        let vExogena = this.ejercicioDadosService.vExogenasDado;
        //console.log(`${i+1}`);
        //console.log(vExogena);
        this.listVEndogenas.push(vExogena);
      }
      this.visualizarResultados();

    }else{
      this.valid=true;
    }
  }
  visualizarResultados(){
    this.dataSource= new MatTableDataSource<VEndogenasDado>(this.listVEndogenas)
    this.dataSource.paginator = this.paginator;
  }


  verLista(vEstados:VEstadoDado[]) {
    const dialogRef = this.dialog.open(DialogContentEstadosComponent, {
      width: '700px',
      data: {estados: vEstados},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

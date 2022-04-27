import {Component, OnInit, ViewChild} from '@angular/core';
import {EjercicioGallinasService} from "../../services/ejercicio-gallinas.service";
import {
  VariablesEndogenasGallinas,
  VariablesEstadoGallinas,
  VariablesExogenasGallinas
} from "../../models/EjercicioGallinas";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {DialogGallinaEstadosComponent} from "./dialog-gallina-estados/dialog-gallina-estados.component";

@Component({
  selector: 'app-ejercicio-gallinas',
  templateUrl: './ejercicio-gallinas.component.html',
  styleUrls: ['./ejercicio-gallinas.component.css']
})
export class EjercicioGallinasComponent implements OnInit {

  generateData: FormGroup;
  hintColor = '#ff0000';
  valid:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VariablesEndogenasGallinas>;
  displayedColumns = ['IngresoBruto','IngresoPromedio', 'NroDeHuevosRotos', 'NroDePollosMuertos', 'Opciones'];

  variablesExogenasGallinas:VariablesExogenasGallinas={
    NMaxD: 0,
    PVH: 0,
    PVP: 0
  }

  listVEndogenas:VariablesEndogenasGallinas[]=[];

  constructor(private ejercicioGallinasService:EjercicioGallinasService,
              private fb:FormBuilder,
              public dialog: MatDialog) {
    this.generateData = this.fb.group({
      NMaxD: ['', Validators.required],
      PVH: ['', Validators.required],
      PVP: ['', Validators.required],
      nroSimulaciones: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    /***this.variablesExogenasGallinas={
      NMaxD: 10,
      PVH: 2,
      PVP: 30
    }
    this.ejercicioGallinasService.ejecutarAlgoritmo(this.variablesExogenasGallinas);
    let result = this.ejercicioGallinasService.variablesEndogenasGallinas;
    console.log(result);**/
  }

  limpiarArreglo(){
    this.listVEndogenas=[];
  }

  generarNumeros() {
    this.limpiarArreglo();
    if(this.generateData.valid){
      this.variablesExogenasGallinas={
        NMaxD: this.generateData.value.NMaxD,
        PVH: this.generateData.value.PVH,
        PVP: this.generateData.value.PVP
      }
      for(let i=0;i<this.generateData.value.nroSimulaciones;i++){

        this.ejercicioGallinasService.ejecutarAlgoritmo(this.variablesExogenasGallinas);
        let vExogena = this.ejercicioGallinasService.variablesEndogenasGallinas;
        this.listVEndogenas.push(vExogena);
        console.log(vExogena);
      }
      console.log(this.listVEndogenas);
      this.visualizarResultados();
    }else{
      this.valid=true;
    }
  }
  visualizarResultados(){
    this.dataSource= new MatTableDataSource<VariablesEndogenasGallinas>(this.listVEndogenas)
    this.dataSource.paginator = this.paginator;
  }

  verLista(vEstados: VariablesEstadoGallinas) {
    const dialogRef = this.dialog.open(DialogGallinaEstadosComponent, {
      width: '1200px',
      data: {estados: vEstados},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

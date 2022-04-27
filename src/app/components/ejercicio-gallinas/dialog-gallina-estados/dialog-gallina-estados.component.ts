import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {VariablesEstadoGallinas} from "../../../models/EjercicioGallinas";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {VariablesEstadoDado} from "../../../models/Dado";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
export interface DialogData {
  estados: VariablesEstadoGallinas[];
}
@Component({
  selector: 'app-dialog-gallina-estados',
  templateUrl: './dialog-gallina-estados.component.html',
  styleUrls: ['./dialog-gallina-estados.component.css']
})
export class DialogGallinaEstadosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VariablesEstadoGallinas>;

  displayedColumns = ['ContadorDias','AleatorioNumeroHuevosPuestos','NumeroHuevosPuestos','Opciones'];

  constructor(
    public dialogRef: MatDialogRef<DialogGallinaEstadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
  ) {}

  ngOnInit(): void {
    this.dataSource= new MatTableDataSource<VariablesEstadoGallinas>(this.data.estados)
  }

}

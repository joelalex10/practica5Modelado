import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {VariablesEndogenasDado, VariablesEstadoDado} from "../../../models/Dado";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface DialogData {
  estados: VariablesEstadoDado[];
}
@Component({
  selector: 'app-dialog-content-estados',
  templateUrl: './dialog-content-estados.component.html',
  styleUrls: ['./dialog-content-estados.component.css']
})

export class DialogContentEstadosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VariablesEstadoDado>;

  displayedColumns = ['Contador','rDado1','rDado2','Dado1','Dado2' ,'SumaDados'];

  constructor(
    public dialogRef: MatDialogRef<DialogContentEstadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
  ) {}

  ngOnInit(): void {
    this.dataSource= new MatTableDataSource<VariablesEstadoDado>(this.data.estados)
  }

}

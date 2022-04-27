import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CompraClientes, VEstadoLlegadaClientes} from "../../../models/LlegadaClientes";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {VariablesEstadoDado} from "../../../models/Dado";
import {
  DialogClientesEstadosComprasComponent
} from "../dialog-clientes-estados-compras/dialog-clientes-estados-compras.component";
export interface DialogData {
  estados: VEstadoLlegadaClientes[];
}
@Component({
  selector: 'app-dialog-clientes-estados',
  templateUrl: './dialog-clientes-estados.component.html',
  styleUrls: ['./dialog-clientes-estados.component.css']
})
export class DialogClientesEstadosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<VEstadoLlegadaClientes>;

  displayedColumns = ['ContadorHora','AleatorioLlegadaCliente','LlegadaCliente','Opciones'];
  constructor(
    public dialogRef: MatDialogRef<DialogClientesEstadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource= new MatTableDataSource<VEstadoLlegadaClientes>(this.data.estados);
  }

  verLista(compraClientes: CompraClientes[]) {
    const dialogRef = this.dialog.open(DialogClientesEstadosComprasComponent, {
      width: '1000px',
      data: {estados: compraClientes},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}

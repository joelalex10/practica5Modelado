import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CompraClientes, VEstadoLlegadaClientes} from "../../../models/LlegadaClientes";
import {VariablesEstadoDado} from "../../../models/Dado";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
export interface DialogData {
  compraClientes: CompraClientes[];
}
@Component({
  selector: 'app-dialog-clientes-estados-compras',
  templateUrl: './dialog-clientes-estados-compras.component.html',
  styleUrls: ['./dialog-clientes-estados-compras.component.css']
})
export class DialogClientesEstadosComprasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<CompraClientes>;

  displayedColumns = ['ContadorCliente','AleatorioCompraCliente','CompraCliente'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
  ) { }

  ngOnInit(): void {
    this.dataSource= new MatTableDataSource<CompraClientes>(this.data.compraClientes)
  }

}

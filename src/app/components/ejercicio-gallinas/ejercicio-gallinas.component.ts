import { Component, OnInit } from '@angular/core';
import {EjercicioGallinasService} from "../../services/ejercicio-gallinas.service";
import {VariablesExogenasGallinas} from "../../models/EjercicioGallinas";

@Component({
  selector: 'app-ejercicio-gallinas',
  templateUrl: './ejercicio-gallinas.component.html',
  styleUrls: ['./ejercicio-gallinas.component.css']
})
export class EjercicioGallinasComponent implements OnInit {

  variablesExogenasGallinas:VariablesExogenasGallinas={
    NMaxD: 0,
    PVH: 0,
    PVP: 0
  }

  constructor(private ejercicioGallinasService:EjercicioGallinasService) { }

  ngOnInit(): void {
    this.variablesExogenasGallinas={NMaxD: 10,
      PVH: 2,
      PVP: 30
    }
    this.ejercicioGallinasService.ejecutarAlgoritmo(this.variablesExogenasGallinas);
  }

}

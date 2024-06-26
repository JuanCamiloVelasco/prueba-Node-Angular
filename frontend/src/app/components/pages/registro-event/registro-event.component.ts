import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IEventoRegister } from '../../../shared/interfaces/IEventoRegister';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-registro-event',
    standalone: true,
    templateUrl: './registro-event.component.html',
    styleUrl: './registro-event.component.css',
    imports: [ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterLink, NgFor, FormsModule, NgFor]
})
export class RegistroEventComponent implements OnInit{
  registerForm!:FormGroup;
  isSubmited = false;
  returnUrl = '';
  seleccionado = null

  tipos = [
    {name: "reunion"},
    {name: "fiesta"},
    {name: "incidente"},
    {name: "deporte"}
 ];

  constructor( private formBuilder:FormBuilder, private eventoService:EventosService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      fecha: [Date, Validators.required],
      descripcion:['', [Validators.required, Validators.minLength(5)]],
      tipo:['', [Validators.required]]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmited = true;
    if(this.registerForm.invalid) return console.log(this.registerForm);

    const fv = this.registerForm.value;

    const evento : IEventoRegister = {
      nombre: fv.nombre,
      fecha: fv.fecha,
      descripcion: fv.descripcion,
      tipo: fv.tipo,
    };

    this.eventoService.register(evento).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}


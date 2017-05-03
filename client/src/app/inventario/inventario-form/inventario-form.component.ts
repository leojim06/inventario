import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Producto } from '../shared/models/producto.model';
import { ProductosService } from '../shared/services/productos.service';
import { CustomValidators } from '../../shared/validators';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.css']
})
export class InventarioFormComponent implements CloseGuard, OnInit {

  context;

  public username: string;
  public password: string;

  private productoForm: FormGroup;
  private formError: { [id: string]: string };
  private validationMessage: { [id: string]: { [id: string]: string } };
  private producto;


  constructor(
    public dialog: DialogRef<any>,
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router) {
    this.context = dialog.context; // this is the dialog reference
    dialog.setCloseGuard(this);

    this.formError = {
      'nombre': '',
      'cantidad': '',
      'precio': ''
    }

    this.validationMessage = {
      'nombre': {
        'required': 'El nombre del producto es requerido',
        'minlength': 'El nombre del producto no puede tener menos de 3 caracteres'
      },
      'cantidad': {
        'required': 'La cantidad es requerida',
        'range': 'La cantidad debe ser un número entre 1 y 100.000'
      },
      'precio': {
        'required': 'El precio es requerido',
        'range': 'El precio debe ser un número entre 100 y 99.999.999'
      }
    }
  }

  onClose() {
    this.dialog.close(this);
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.initForm();
    this.lookChanges();
  }

  private initForm() {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      cantidad: ['', Validators.compose([
        Validators.required,
        CustomValidators.range([1, 100000])
      ])],
      precio: ['', Validators.compose([
        Validators.required,
        CustomValidators.range([100, 99999999])
      ])]
    });
  }

  private lookChanges(): void {
    this.productoForm.valueChanges
      .map(value => { return value; })
      .subscribe(data => {
        this.onValueChanged(data);
      },
      error => {
        console.error(`error: ${error}`);
      });
  }

  private onValueChanged(data: any): void {

    for (let field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        let hasError = this.productoForm.controls[field].dirty;
        this.formError[field] = '';
        if (hasError) {
          for (let key in this.productoForm.controls[field].errors) {
            if (this.productoForm.controls[field].errors.hasOwnProperty(key)) {
              this.formError[field] += this.validationMessage[field][key] + "\n";
            }
          }
        }
      }
    }
  }

  private onSubmit({ value, valid }: { value: Producto, valid: boolean }) {
    if (valid) {
      this.producto = { producto: value };
      this.productosService.create(this.producto).subscribe((result: any) => {
        this.onClose();
        // this.router.navigate(['/inventario']);
      }, error => {
        console.error('Ha ocurrido un error');
      });
    }
  }

}

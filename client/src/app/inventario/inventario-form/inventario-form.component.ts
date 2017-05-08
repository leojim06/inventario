import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Producto } from '../shared/models/producto.model';
import { ProductosService } from '../shared/services/productos.service';
import { CustomValidators } from '../../shared/validators';

// import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
// import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.css']
})
// export class InventarioFormComponent implements CloseGuard, OnInit {
export class InventarioFormComponent implements OnInit {

  public titulo: string = 'Nuevo Producto';
  public btnText: string = 'Agregar Producto';
  private isSubmitin: boolean = false;
  private isValidForm: boolean = false;

  public productoForm: FormGroup;
  public formError: { [id: string]: string };
  private validationMessage: { [id: string]: { [id: string]: string } };

  @Input() producto: Producto;


  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router) {

    this.formError = {
      'nombre': '',
      'cantidad': '',
      'precio': '',
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

  ngOnInit() {
    if (this.producto) {
      this.titulo = 'Modificar Producto';
      this.btnText = 'Modificar';
    }
    this.initForm();
    this.lookChanges();
  }

  private initForm() {
    let prod: Producto;
    this.producto ?
      prod = this.producto :
      prod = <Producto>{}

    this.productoForm = this.fb.group({
      nombre: [prod.nombre, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      cantidad: [prod.cantidad, Validators.compose([
        Validators.required,
        CustomValidators.range([1, 100000])
      ])],
      precio: [prod.precio, Validators.compose([
        Validators.required,
        CustomValidators.range([100, 99999999])
      ])],
      descripcion: ['']
    });
  }

  private lookChanges(): void {
    this.productoForm.valueChanges
      .map(value => { return value; })
      .subscribe(data => {
        if(this.productoForm.valid){
          this.isValidForm = true;
        }
        this.onValueChanged(data);
      },
      error => {
        console.error(`error: ${error}`);
      });
  }

  private onValueChanged(data: any): void {

    // if (this.productoForm.valid) {
    //   this.isValidForm = true;
    // }

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

  public onSubmit({ value, valid }: { value: Producto, valid: boolean }) {
    if (valid) {
      if (this.producto) {
        value._id = this.producto._id;
        this.productosService.update(value).subscribe((result: any) => {
          this.router.navigate(['/inventario']);
        }, error => {
          console.error('Ha ocurrido un error');
        });
      } else {
        this.productosService.create(value).subscribe((result: any) => {
          this.router.navigate(['/inventario']);
        }, error => {
          console.error('Ha ocurrido un error');
        });
      }
    }
  }

}

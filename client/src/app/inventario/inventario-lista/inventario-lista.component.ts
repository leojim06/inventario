import { Component, OnInit, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router/";

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Producto } from '../shared/models/producto.model';
import { ProductosService } from '../shared/services/productos.service';
import { InventarioFormComponent } from '../inventario-form/inventario-form.component';


@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrls: ['./inventario-lista.component.css']
})
export class InventarioListaComponent implements OnInit {

  public productos: Producto[];
  private total: number;

  constructor(
    private productosService: ProductosService,
    private modal: Modal,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {
    this.overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.productosService.getAll().subscribe(
      (productos) => {
        this.changeDetectorRef.markForCheck();
        this.productos = productos;
        this.total = productos.reduce((total, p) => total + p.total, 0);
      }
    );
  }

  nuevoProducto(): void {
    this.router.navigate(['/inventario/nuevo']);
  }

  editarProducto(producto: Producto): void {
    this.router.navigate(['/inventario/editar', producto._id]);
  }

  eliminarProducto(producto: Producto): void {
    this.modal.confirm()
      .size('sm')
      .showClose(false)
      .title('Eliminar Producto')
      .body(`Desea eliminar el producto ${producto.nombre}`)
      .isBlocking(true)
      .okBtn('Eliminar')
      .cancelBtn('Cancelar')
      .open()
      .catch((err: any) => { console.log('Error: ' + err) })
      .then((dialog: any) => { return dialog.result })
      .then((result: any) => { this.destroy(producto) })
      .catch((err: any) => { this.cancel() });
  }

  private destroy(producto: Producto): void {
    this.productosService.destroy(producto._id).subscribe(
      (result) => {
        this.productos.splice(this.productos.indexOf(producto), 1);
        this.total = 0;
        this.productos.forEach(prod => {
          this.total = this.total + prod.total;
        });
      },
      (error) => { console.error('Error') }
    );
  }

  private cancel(): void {
    console.log('Eliminación cancelada')
  }

}

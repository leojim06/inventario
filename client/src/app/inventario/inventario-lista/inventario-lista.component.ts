import { Component, OnInit, Input, ViewContainerRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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

  private productos: Observable<any>;
  private total: Observable<number>;

  constructor(
    private productosService: ProductosService,
    private modal: Modal,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone) {
    this.overlay.defaultViewContainer = vcRef;
  }


  ngOnInit() {
    this.ngZone.run(() => {
      this.productos = this.productosService.getAll();
      this.total = this.productos.map(producto => producto.reduce((total, p) => total + p.total, 0));
    })
  }

  openModal() {
    this.modal.open(InventarioFormComponent, overlayConfigFactory({}, BSModalContext));
    this.productos = this.productosService.getAll();
  }

  productoDestroy(producto: Producto): void {
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
        this.productos = this.productos.filter(prod => prod !== producto);
        this.total = this.productos.map(producto => producto.reduce((total, p) => total + p.total, 0));
      },
      (error) => { console.error('Error') }
    );
  }

  private cancel(): void {
    console.log('Eliminación cancelada')
  }

}

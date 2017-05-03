import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InventarioComponent } from './inventario.component';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';
import { InventarioFormComponent } from './inventario-form/inventario-form.component';
import { ProductosService } from './shared/services/productos.service';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioAddComponent } from './inventario-add/inventario-add.component';
import { InventarioEditComponent } from './inventario-edit/inventario-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventarioRoutingModule
  ],
  declarations: [
    InventarioComponent,
    InventarioListaComponent,
    InventarioFormComponent,
    InventarioAddComponent,
    InventarioEditComponent
  ],
  providers: [
    ProductosService
  ],
  entryComponents: [InventarioFormComponent],
  exports: [
    // InventarioRoutingModule
  ]
})
export class InventarioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';

import { AutoCompleteModule } from 'primeng/primeng';
import { ProductoSeleccionadoVentaComponent } from './producto-seleccionado-venta/producto-seleccionado-venta.component';
import { TablaProductosVentaComponent } from './tabla-productos-venta/tabla-productos-venta.component';
import { VentasService } from './shared/services/ventas.service';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { FacturaComponent } from './factura/factura.component';

@NgModule({
  imports: [
    CommonModule,
    VentasRoutingModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    VentasComponent, 
    ProductoSeleccionadoVentaComponent, 
    TablaProductosVentaComponent, ReporteVentasComponent, FacturaComponent],
    providers: [
      VentasService
    ]
})
export class VentasModule { }

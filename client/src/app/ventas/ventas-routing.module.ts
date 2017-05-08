import { VentasModule } from './ventas.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { VentasComponent } from './ventas.component';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';

const ventasRouters: Routes = [
   { path: 'ventas', component: VentasComponent },
   { path: 'reporte', component: ReporteVentasComponent }
]

@NgModule({
   imports: [RouterModule.forChild(ventasRouters)],
   exports: [RouterModule]
})

export class VentasRoutingModule { }
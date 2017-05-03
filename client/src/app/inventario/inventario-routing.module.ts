import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InventarioComponent } from './inventario.component';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';

const inventarioRoutes: Routes = [
   {
      path: 'inventario',
      component: InventarioComponent,
      children: [
         {
            path: '',
            children: [
               { path: '', component: InventarioListaComponent }
            ]
         }
      ]
   }
]

@NgModule({
   imports: [RouterModule.forChild(inventarioRoutes)],
   exports: [RouterModule]
})

export class InventarioRoutingModule { }
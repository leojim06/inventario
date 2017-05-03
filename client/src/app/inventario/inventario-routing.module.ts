import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InventarioComponent } from './inventario.component';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';
import { InventarioAddComponent } from './inventario-add/inventario-add.component';
import { InventarioEditComponent } from './inventario-edit/inventario-edit.component';

const inventarioRoutes: Routes = [
   {
      path: 'inventario',
      component: InventarioComponent,
      // children: [
      //    {
      //       path: '',
      //       children: [
      //          { path: '', component: InventarioListaComponent }
      //       ]
      //    }
      // ]
      children: [
         { path: '', component: InventarioListaComponent },
         { path: 'nuevo', component: InventarioAddComponent },
         { path: 'editar/:id', component: InventarioEditComponent }
      ]
   }
]

@NgModule({
   imports: [RouterModule.forChild(inventarioRoutes)],
   exports: [RouterModule]
})

export class InventarioRoutingModule { }
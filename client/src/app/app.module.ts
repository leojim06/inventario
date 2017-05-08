import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/layout/header.component';

import { InventarioModule } from './inventario/inventario.module';
import { AppRoutingModule } from './app-routing.module';
import { VentasModule } from './ventas/ventas.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule,
    InventarioModule,
    VentasModule,
    AppRoutingModule,
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

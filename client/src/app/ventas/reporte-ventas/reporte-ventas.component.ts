import { Component, OnInit } from '@angular/core';

import { VentasService } from '../shared/services/ventas.service';
import { ListaVenta } from '../shared/model/venta.model';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  public ventas: ListaVenta[];
  public totalVentas: number = 0;
  public totalVentasGanancia: number = 0;
  public totalItemVendidos: number = 0;

  constructor(private ventasService: VentasService) { }

  ngOnInit() {
    this.ventasService.getAll().subscribe(
      (ventas: ListaVenta[]) => {
        this.ventas = ventas;
        this.totalVentasGanancia = ventas.reduce((total, venta) => total + venta.totalVenta, 0);
        this.totalVentas = this.ventas.length;
        this.totalItemVendidos = ventas.reduce((total, venta) => total + venta.items.reduce((t, item) => t + item.cantidad, 0), 0);
        // let productosVendidos = ventas.map((venta) => venta.items.map((item) => { 
        //   console.log(item);
        //   console.log(item.cantidad);
        //   item.cantidad
        // }));
        // console.log(productosVendidos);
      },
      (error: any) => console.error(error)
    );
  }

}

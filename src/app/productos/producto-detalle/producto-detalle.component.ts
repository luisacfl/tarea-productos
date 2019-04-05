import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto;
  id: number;
  modoCompras = false;
  constructor(private productosService: ProductosService,
              private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.modoCompras = this.productosService.modoCompras;
    this.route.params
    .subscribe(
      (params) => {
        this.id = Number(params.id);
        this.producto = this.productosService.getProducto(this.id);
      }
    );
  }

}

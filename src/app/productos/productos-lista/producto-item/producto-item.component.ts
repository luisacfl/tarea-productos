import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../producto';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  @Output() productoPorBorrar = new EventEmitter();
  @Output() detallePorMostrar = new EventEmitter();
  @Output() productoPorAlterar = new EventEmitter();
  checkValue = false;
  modoCompras = false;
  
  constructor(private productosService: ProductosService){}

  ngOnInit() {
    this.modoCompras = this.productosService.modoCompras;
  }

  borrarProductoCompras() {
    this.productoPorBorrar.emit(this.producto);
  }
  vistaDetalle(){
    this.detallePorMostrar.emit(this.producto);
  }
  alterarArregloCompras(){
    this.productoPorAlterar.emit(this.producto);
  }


}

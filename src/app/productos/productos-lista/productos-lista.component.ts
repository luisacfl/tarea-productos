import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  compras: Producto[];
  items: Producto[];
  selectedProd: Producto[];
  modoCompras: boolean;
  totalArticulos: number;
  totalGeneral: number;

  private subscript: Subscription;
  
  constructor(private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.compras = this.productosService.getCompras();
    this.selectedProd = [];
    this.totalArticulos = 0;
    this.totalGeneral = 0;
    if(this.router.url == "/carrito"){
      this.productosService.modoCompras = true;
      this.totalGeneral = this.productosService.getTotalMoney();
    }
    else{
      this.productosService.modoCompras = false;
    }
    this.modoCompras = this.productosService.getModoCompras();
    this.items = this.productosService.getItems();
    console.log(this.items);
    //TODO: revisar el route modoCompras - modoProductos

    this.subscript = this.productosService.cambiaDato
      .subscribe(
        (arregloCompras: Producto[]) => {
          this.compras = arregloCompras;
        }
      );
  }

  borrarProductoCompras(productoABorrar) {
    this.productosService.borrarProducto(productoABorrar.id);
    //this.alumnos = this.alumnosService.getAlumnos();
  }

  mostrarDetalle(detallePorMostrar) {
    this.router.navigate([detallePorMostrar.id], {relativeTo: this.route});
  }
  alterarListaCompras(productoPorAlterar): boolean {
    //buscar si ya existe 
    const tempSelected = this.selectedProd.findIndex(pr => pr.id === productoPorAlterar.id);
    
    //si existe, lo elimina de selectedProd
    if(tempSelected>=0){
      this.selectedProd.splice(tempSelected, 1);
      this.totalArticulos --;
      return false;
    }
    //si no existe, lo agrega a selectedProd
    this.selectedProd.push(Object.assign({}, productoPorAlterar));
    this.totalArticulos++;
    return true;
  }
  agregarCompra(){
    this.selectedProd.forEach(pr =>{
      this.productosService.addProductoCarrito(pr);
    });
  }
}

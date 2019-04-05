import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private lastId = 1;
  modoCompras = false;
  
  productos: Producto[] = [
    new Producto(this.lastId++, 'Huesos de goma', 'Nupec', 'Juguetes', 72.50, 30),
    new Producto(this.lastId++, 'Pelota', 'Kong', 'Juguetes', 68.00, 60),
    new Producto(this.lastId++, 'Peluche', 'Pet Zone', 'Juguetes', 230.00, 15),
    new Producto(this.lastId++, 'Cama para mascota', 'Fancy Pets', 'Basicos', 340.00, 9),
    new Producto(this.lastId++, 'Collar', 'Our Pets', 'Basicos', 52.00, 42),
    new Producto(this.lastId++, 'Tazones', 'Our Pets', 'Basicos', 293.50, 36),
    new Producto(this.lastId++, 'Hueso sabor pollo', 'Campi', 'Comida', 32.00, 47),
    new Producto(this.lastId++, 'Croquetas', 'Nupec', 'Comida', 72.50, 24),
    new Producto(this.lastId++, 'Correa', 'Fancy Pets', 'Basicos', 72.50, 35),
    new Producto(this.lastId++, 'Pechera', 'Pet Zone', 'Basicos', 72.50, 23)
  ];

  compras: Producto[] = [];
  cambiaDato = new Subject<Producto[]>();

  addProductoCarrito(producto: Producto): boolean {
    const prodId = this.productos.findIndex(pr => pr.id === producto.id);
    const coId = this.compras.findIndex(pr => pr.id === producto.id);

    //Revisar existencia, revisar repeticion de productos en carrito, revisar que producto exista
    if(producto.existencia<=0 || prodId<0 || coId>=0){
      return false;
    }
    //restar cantidad de productos
    this.productos[prodId].existencia--;
    this.compras.push(Object.assign({}, producto));
    this.notificarCambios();
    return true;
  }

  borrarProducto (id: number): boolean {
    const prPos = this.productos.findIndex(pr => pr.id ===id);
    if(prPos<0)
      return false;
    console.log('producto borrado');
    this.compras.splice(prPos, 1);
    this.notificarCambios();
    return true;
  }

  getNextId(): number {
    return this.lastId;
  }

  getProductos(): Producto[] {
    return this.productos.slice();
  }
  getProducto(id: number):Producto {
    return Producto[id];
  }
  getCompras(): Producto[]{
    return this.compras.slice();
  }

  getModoCompras(): boolean{
    return this.modoCompras;
  }

  getItems(): Producto[]{
    if(this.modoCompras===false){
      return this.getProductos();
    }
    return this.getCompras();
  }

  notificarCambios() {
    this.cambiaDato.next(Object.assign({}, this.compras));
  }

  getTotalMoney(): number{
    let total = 0;
    this.compras.forEach(pr =>{
      total=total+pr.precio;
    });
    return total;
  }
  
  constructor() { }

}

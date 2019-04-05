import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { ProductoItemComponent } from './productos/productos-lista/producto-item/producto-item.component';
import { ProductoDetalleComponent } from './productos/producto-detalle/producto-detalle.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductosComponent,
    ProductosListaComponent,
    ProductoItemComponent,
    ProductoDetalleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { ProductoDto } from '../../interfaces/producto-dto';
import { CartService } from '../../services/cart-service';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements AfterViewInit {
  productos: ProductoDto[] = [];
  public monedaLocal: string = 'GTQ';

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadProductos());
  }

  private loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (resp) => {
        this.productos = resp;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(producto: ProductoDto): void {
    if (!producto.id) return;

    this.cartService.addToCart(producto.id, 1).subscribe({
      next: () => {
        this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error('Error agregando al carrito', err);
        this.snackBar.open('Error al agregar producto al carrito', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}

import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../../services/cart-service';
import { CarritoDto } from '../../interfaces/carrito-dto';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements AfterViewInit {
  cart: CarritoDto = { items: [], total: 0 };
  loading = false;
  error = '';

  constructor(
    private cartService: CartService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.loadCart());
  }

  loadCart(): void {
    this.loading = true;
    this.error = '';

    this.cartService.getCart().subscribe({
      next: (resp) => {
        this.cart = resp ?? { items: [], total: 0 };
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando carrito', err);
        this.error = 'No se pudo cargar el carrito. Intenta nuevamente.';
        this.loading = false;
        this.cart = { items: [], total: 0 };
        this.cd.markForCheck();
      }
    });
  }

  removeItem(itemId: number): void {
    this.loading = true;
    this.cartService.removeCartItem(itemId).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Error eliminando item', err);
        this.error = 'No se pudo eliminar el producto.';
        this.loading = false;
      }
    });
  }

  get totalItems(): number {
    return this.cart.items.reduce((count, item) => count + item.cantidad, 0);
  }

  trackByItem(index: number, item: { id: number }): number {
    return item.id;
  }
}

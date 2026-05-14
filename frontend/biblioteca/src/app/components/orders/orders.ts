import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PedidoDto } from '../../interfaces/pedido-dto';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  pedido: PedidoDto = {
    id: 0,
    fecha: '',
    estado: '',
    total: 0,
    productos: []
  };

  ngOnInit(): void {
    this.loadPedido();
  }

  private loadPedido(): void {
    // Reemplazar con llamada real al servicio cuando esté disponible
    this.pedido = {
      id: 123,
      fecha: '2026-05-13',
      estado: 'En proceso',
      total: 2598,
      productos: [
        {
          id: 1,
          nombre: 'Casco LS2 Stream Evo',
          precio: 1299,
          imagenUrl: 'https://example.com/casco.jpg',
          cantidad: 2,
          subtotal: 2598
        }
      ]
    };
  }

  get totalProductos(): number {
    return this.pedido.productos.reduce((sum, prod) => sum + prod.cantidad, 0);
  }
}

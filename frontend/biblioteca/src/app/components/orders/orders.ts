import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { PedidoDto } from '../../interfaces/pedido-dto';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
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
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const orderIdParam = this.route.snapshot.paramMap.get('id');
    const orderId = orderIdParam ? Number(orderIdParam) : null;
    console.log('Orders component init, orderId:', orderId);
    if (orderId) {
      this.loadPedido(orderId);
    } else {
      this.loadLatestPedido();
    }
  }

  private loadPedido(id: number): void {
    console.log('Loading pedido with id:', id);
    this.loading = true;
    this.error = '';
    this.cd.markForCheck();

    this.orderService.getPedidoById(id).subscribe({
      next: (pedido) => {
        console.log('Pedido received:', pedido);
        try {
          this.pedido = this.mapPedido(pedido);
          this.loading = false;
          this.cd.markForCheck();
          console.log('Pedido mapped successfully:', this.pedido);
        } catch (err) {
          console.error('Error mapping pedido', err);
          this.error = 'Error procesando datos del pedido.';
          this.loading = false;
          this.cd.markForCheck();
        }
      },
      error: (err) => {
        console.error('HTTP Error loading pedido', err);
        this.error = 'No se pudo cargar el pedido. Intenta nuevamente.';
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  private loadLatestPedido(): void {
    console.log('Loading latest pedido');
    this.loading = true;
    this.error = '';
    this.cd.markForCheck();

    this.orderService.getLatestPedido().subscribe({
      next: (pedido) => {
        console.log('Latest pedido received:', pedido);
        try {
          this.pedido = this.mapPedido(pedido);
          this.loading = false;
          this.cd.markForCheck();
          console.log('Latest pedido mapped successfully:', this.pedido);
        } catch (err) {
          console.error('Error mapping latest pedido', err);
          this.error = 'Error procesando datos del pedido.';
          this.loading = false;
          this.cd.markForCheck();
        }
      },
      error: (err) => {
        console.error('HTTP Error loading latest pedido', err);
        this.error = 'No se encontró ningún pedido reciente.';
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  private mapPedido(pedido: any): PedidoDto {
    console.log('Mapping pedido, raw data:', pedido);
    
    if (!pedido) {
      throw new Error('Pedido is null or undefined');
    }

    const detalles = pedido.detalles ?? pedido.detallePedidos ?? [];
    console.log('Detalles found:', detalles);

    const productos = detalles.map((detalle: any) => {
      console.log('Processing detalle:', detalle);
      return {
        id: detalle?.producto?.id ?? detalle?.producto_id,
        nombre: detalle?.producto?.nombre ?? 'Producto',
        precio: Number(detalle?.precio_unitario ?? detalle?.producto?.precio ?? 0),
        imagenUrl: detalle?.producto?.imagenUrl ?? detalle?.producto?.imagen ?? '',
        cantidad: Number(detalle?.cantidad ?? 0),
        subtotal: Number(detalle?.subtotal ?? 0)
      };
    });

    return {
      id: pedido.id,
      fecha: pedido.fecha_pedido ? new Date(pedido.fecha_pedido).toLocaleDateString() : '',
      estado: pedido.estado?.nombre ?? 'Pendiente',
      total: Number(pedido.total ?? 0),
      productos: productos
    };
  }

  get totalProductos(): number {
    return this.pedido.productos.reduce((sum, prod) => sum + prod.cantidad, 0);
  }
}

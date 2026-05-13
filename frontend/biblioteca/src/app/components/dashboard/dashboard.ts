import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface AdminMetrics {
  productos: number;
  pedidos: number;
  usuarios: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  totals: AdminMetrics = {
    productos: 0,
    pedidos: 0,
    usuarios: 0,
  };

  ngOnInit(): void {
    this.loadMetrics();
  }

  private loadMetrics(): void {
    // Reemplazar con llamadas a servicios reales cuando estén disponibles.
    this.totals = {
      productos: 128,
      pedidos: 84,
      usuarios: 2150,
    };
  }
}

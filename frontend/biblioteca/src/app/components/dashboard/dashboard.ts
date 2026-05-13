import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardService, DashboardMetrics } from '../../services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  totals: DashboardMetrics = {
    productos: 0,
    pedidos: 0,
    usuarios: 0,
  };
  loading = true;
  error = '';

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => this.loadMetrics());
  }

  private loadMetrics(): void {
    this.loading = true;
    this.error = '';

    this.dashboardService.getDashboardMetrics().subscribe({
      next: (metrics) => {
        this.totals = metrics;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando métricas del dashboard', err);
        this.error = 'No se pudo cargar los datos del dashboard. Intenta de nuevo.';
        this.loading = false;
        this.cd.markForCheck();
      },
    });
  }
}

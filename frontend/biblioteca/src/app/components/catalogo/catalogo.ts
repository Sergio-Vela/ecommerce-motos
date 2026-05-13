import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { ProductoDto } from '../../interfaces/producto-dto';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {
  productos: ProductoDto[] = [];

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {

    this.productoService.getProductos()
      .subscribe({
        next: (resp) => {
          this.productos = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });

  }
}

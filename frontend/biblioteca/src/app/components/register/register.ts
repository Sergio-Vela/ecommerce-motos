import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { UsuarioDto } from '../../interfaces/usuario-dto';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  usuario: UsuarioDto = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: 'cliente',
    estadoId: 1,
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService
  ) {}

  register() {

    this.usuarioService.register(this.usuario)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          alert('Usuario registrado');
        },
        error: (err) => {
          console.log(err);
        }
      });

  }


}

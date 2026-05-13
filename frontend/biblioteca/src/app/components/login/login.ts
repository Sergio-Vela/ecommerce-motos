import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioDto } from '../../interfaces/usuario-dto';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  correo = '';
  password = '';
  constructor(
    private usuarioService: UsuarioService
  ) { }

  login() {

    this.usuarioService.getUsuarios()
      .subscribe({

        next: (usuarios: UsuarioDto[]) => {

          const usuario = usuarios.find(u =>
            u.correo === this.correo &&
            u.password === this.password
          );

          if (usuario) {

            alert('Login correcto');

            console.log(usuario);

            localStorage.setItem(
              'usuario',
              JSON.stringify(usuario)
            );

          } else {

            alert('Correo o password incorrecto');

          }

        },

        error: (err) => {
          console.log(err);
        }

      });

  }

}

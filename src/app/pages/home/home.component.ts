import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule
  ],
  selector: 'app-inicio',
  template: `
    <mat-toolbar color="accent">
      <div class="toolbar-content">
        <!-- Logotipo -->
        <div class="logo">
          <span>RedSocial</span>
        </div>

        <!-- Barra de búsqueda -->
        <div class="search-bar">
          <mat-form-field appearance="outline">
            <mat-label>Buscar</mat-label>
            <input matInput type="text" />
            <button mat-icon-button matSuffix>
              <mat-icon>search</mat-icon>
            </button>
          </mat-form-field>
        </div>

        <!-- Menú de usuario -->
        <div class="user-menu">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="verPerfil()">
              <mat-icon>person</mat-icon>
              Perfil
            </button>
            <button mat-menu-item (click)="cerrarSesion()">
              <mat-icon>logout</mat-icon>
              Cerrar sesión
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>

    <!-- Contenido principal -->
    <div class="main-content">
      <h1>¡Bienvenido a RedSocial!</h1>
      <p>Aquí podrás interactuar con tus amigos y compartir momentos.</p>
    </div>
  `,
  styles: [
    `
      .toolbar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .logo {
        font-size: 24px;
        font-weight: bold;
      }

      .search-bar {
        flex: 1;
        margin: 0 20px;
      }

      .user-menu {
        display: flex;
        align-items: center;
      }

      .main-content {
        padding: 20px;
        text-align: center;
      }
    `,
  ],
})
export default class HomeComponent {
  private _router = inject(Router);
  private authService = inject(AuthService);

  async cerrarSesion(): Promise<void> {
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/auth/iniciar-sesion');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  verPerfil(): void {
    this._router.navigateByUrl('/perfil');
  }
}

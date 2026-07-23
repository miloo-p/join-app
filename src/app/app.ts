import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, Header],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  /**
   * Injecting the Angular router to monitor active routes.
   */
  private router = inject(Router);

  /**
   * Application title property wrapped in a reactive signal.
   */
  protected readonly title = signal('join-app');

  /**
   * Computed signal that evaluates if the current route belongs to the authentication flow.
   * Returns true for the root login path ('/') or future signup paths.
   */
  protected readonly isAuthPage = computed<boolean>(() => {
    const currentUrl = this.router.url;
    return currentUrl === '/' || currentUrl === '/signup';
  });
}

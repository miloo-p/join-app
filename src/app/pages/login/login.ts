import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  constructor(private router: Router) {}
  
  /**
   * Reactive signal controlling the splash screen animation state.
   * True if the splash screen is currently active/animating, false otherwise.
   */
  public isAnimating = signal<boolean>(true);

  /**
   * Reactive signal controlling whether the password input content is masked.
   * True shows asterisks (password type), false reveals the plain text.
   */
  public hidePassword = signal<boolean>(true);

  /**
   * Reactive signal tracking if the user has typed anything into the password field.
   * Used to swap between the static lock icon and interactive eye icons.
   */
  public hasPasswordText = signal<boolean>(false);

  /**
   * Lifecycle hook that initializes the component and triggers the splash screen transition.
   */
  public ngOnInit(): void {
    this.startSplashTransition();
  }

  /**
   * Initiates the transition from the full-screen splash logo to the corner login logo
   * after a predefined timeout delay.
   * 
   * @private
   */
  private startSplashTransition(): void {
    const animationDelayMs = 1200;

    setTimeout(() => {
      this.isAnimating.set(false);
    }, animationDelayMs);
  }

  /**
   * Toggles the visibility state of the password input field between plain text and masked text.
   */
  public togglePasswordVisibility(): void {
    this.hidePassword.update(value => !value);
  }

  /**
   * Listens to input events on the password field to dynamically show the correct control icons.
   * Resets visibility to hidden if the field becomes completely empty.
   * 
   * @param {Event} event - The HTML input event from the template.
   */
  public onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.hasPasswordText.set(input.value.length > 0);
    
    if (input.value.length === 0) {
      this.hidePassword.set(true);
    }
  }

  /**
   * Handles the guest login action by instantly navigating the user to the dashboard.
   * Driven by Figma behavior: triggers immediately with 0ms animation duration.
   */
    /**
   * Handles the guest login action by programmatically navigating 
   * the user directly to the application dashboard.
   */
  public onGuestLogin(): void {
    this.router.navigate(['/contacts']);
  }

    /**
   * Handles the navigation to the sign-up page when the header button is clicked.
   */
  public onSignupClick(): void {
    this.router.navigate(['/signup']);
  }
}

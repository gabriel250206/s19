import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PasswordResetPage implements OnInit {
  email: string = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() { }

  async onResetPassword() {
    if (this.validateEmail(this.email)) {
      try {
        await this.auth.resetPassword(this.email);
        console.log('Password reset email sent successfully.');
      } catch (error) {
        console.error('Error sending password reset email:', error);
      }
    } else {
      console.error('Invalid email address');
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  onLogin() {
    this.router.navigateByUrl("login");
  }
}

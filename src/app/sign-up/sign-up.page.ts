import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {
  

   username: string= ''; 
   password: string= ''; 

  ngOnInit() {
  }

  constructor(private router:Router,private authService: AuthService,
    private alertController: AlertController) {
    

   }

   async onSubmit() {
    try{
      await this.authService.register(this.username, this.password);
      const alert= await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Usuario registrado correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigateByUrl('login');

    } catch (error) {
      const alert= await this.alertController.create({
        header: 'Error',
        message: 'error.message',
        buttons: ['OK']
      });
      await alert.present();
    }
   }

   validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   }

    onSignUp() {
    this.router.navigateByUrl("sign-up"); 

    }
  // Agregar un elemento con nombre, fecha y estado inicial (no completado)
  // addItem(username: string,  password:string,): void {
  //  if (username.trim() && password.trim() ) {
  //    this.items.push({
       
  //      username: username.trim(),
  //      password: password.trim(),
       
       
       
  //    });
  //    console.log(username.trim(), password.trim());
  //  } else {
  //    console.error('El nombre y la fecha no pueden estar vacíos');
  //  }}


  
  onLogin() {
    this.router.navigateByUrl("login");
  }
}

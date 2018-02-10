import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../Validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  constructor(public fb: FormBuilder,public authprovider: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = this.fb.group({
      userEmail: [null, Validators.compose([Validators.required, EmailValidator.isValid])],
      userPassword: [null, Validators.compose([Validators.minLength(6),Validators.required])]
    })
  }

  ionViewDidLoad() {
   
  }

  login() {
    this.authprovider.signin(this.loginForm.value)
    .then(success => {
      if(success) {
        this.navCtrl.push(HomePage)
      }
    }) .catch(err => {
      console.log(err)
    }) 
    this.loginForm.reset()
    }
  

  register() {
    this.navCtrl.push(RegisterPage)
  }



}

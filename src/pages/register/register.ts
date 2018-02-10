import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../Validators/email';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm:FormGroup
  constructor(public authprovider: AuthProvider,public fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = this.fb.group({
      userName: [null, Validators.required],
      userEmail: [null, Validators.compose([Validators.required, EmailValidator.isValid])],
      userPassword: [null, Validators.compose([Validators.minLength(6),Validators.required])]
      
    })
  }

  register() {
    this.authprovider.signup(this.signupForm.value)
    .then(success => {
      if(success) {
        this.navCtrl.push(LoginPage)
      }
    }).catch(err => {
      console.log(err)
    })
    this.signupForm.reset()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }



  login() {
    this.navCtrl.push(LoginPage)
  }

}

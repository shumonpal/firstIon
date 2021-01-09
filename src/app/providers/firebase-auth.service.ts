import { Injectable } from '@angular/core';
import * as firebase from "firebase/app"
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private angularFireAuth: AngularFireAuth,
     private utility: UtilityService,
      private router: Router) { }

  async registration(email, password, form){
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user)
        result.user.sendEmailVerification();
        this.utility.defaultToast('An verification email has been sent to your email address. Please verifiy email.')
        form.reset();
        this.router.navigate(['/folder/Inbox']);
      }).catch((error) => {
        this.utility.defaultToast(error.message);
      });    
  }

  async login(form){
    const data = {};
     data['email'] = form.controls.email.value;
     data['password'] = form.controls.password.value;

    return await this.angularFireAuth.signInWithEmailAndPassword(data['email'], data['password'])
      .then((result) => {
        form.reset();
         this.router.navigate(['/profile']);
      }).catch((error) => {
        this.utility.defaultToast(error.message);
      })
  }

  async logout(){
    try {
      await this.angularFireAuth.signOut();
      this.router.navigate(['login']);
      this.utility.defaultToast('Logout successfull')
    } catch (error) {
      throw new Error(error.message);      
    }    
  }

  authState(){
    return this.angularFireAuth.authState;
  }

  isLogin(){
    return this.authState().subscribe(user => {
        if (user) {
          return true;
        } else {
          return false;
        }
    })
  }

  googleLogin(){
    return this.angularFireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
    .then((result) => {
      this.utility.defaultToast('You have been successfully logged in!');
      this.router.navigate(['/profile']);
    }).catch((error) => {
      this.utility.defaultToast(error.message);
    })
  }
}

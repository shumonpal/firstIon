import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN } from '../constants/formErrorMessage';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { HelpersService } from '../providers/helpers.service';
import { UtilityService } from '../providers/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  initErrorFormMsg: any = {
    email: '',
    password: ''
  };
  validationMsg: any = LOGIN;
  showSpinner: boolean = false;


  constructor(private helpers: HelpersService,
     private router: Router,
      private FAService: FirebaseAuthService,
       private utility: UtilityService){}


  ngOnInit(){
    this.createForm();

  }

  createForm(){
    this.loginForm = new FormGroup({
          email:   new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
          remenber: new FormControl(null)
        });
      this.loginForm.valueChanges.subscribe((data) => {
        this.initErrorFormMsg = this.helpers.formValidationMsg(this.loginForm, this.validationMsg, this.initErrorFormMsg)
        
      });
  }
  
  async loginSubmit(){
    try {
      this.showSpinner = true;
      await this.FAService.login(this.loginForm)
      this.showSpinner = false;
    } catch (error) {
      this.utility.defaultToast(error.message);
      this.showSpinner = false;
    }
  }

  async loginGoogle(){
    await this.FAService.googleLogin();
  }

  gotoRegistrationPage(event){
    event.preventDefault()
    this.router.navigate(['/registration']);
  }

}

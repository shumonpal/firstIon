import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGISTRATION } from '../constants/formErrorMessage';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { HelpersService } from '../providers/helpers.service';
import { UtilityService } from '../providers/utility.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  regiForm: FormGroup;
  initErrorFormMsg: any = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  }
  validationMsg: any = REGISTRATION;
  matchPassword: boolean = false;
  showSpinner: boolean = false;
  
  constructor(private helpers: HelpersService, private router: Router, private fireAuthService: FirebaseAuthService,  private utility: UtilityService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.regiForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(70)]),
      remember: new FormControl(null)
    });
    this.regiForm.valueChanges.subscribe((data) => {
      this.initErrorFormMsg = this.helpers.formValidationMsg(this.regiForm, this.validationMsg, this.initErrorFormMsg)
      //match password
      this.helpers.matchPassword(this.regiForm.controls.password, this.regiForm.controls.confirmPassword)
      ? this.matchPassword = true
      : this.matchPassword = false
    });
    
  }

  async regiSubmit(){
    try {
      this.showSpinner = true;
      await this.fireAuthService.registration(this.regiForm.controls.email.value, this.regiForm.controls.password.value, this.regiForm);
      this.showSpinner = false;
    } catch (error) {
      this.utility.defaultToast(error.message);
      this.showSpinner = false;
    }
  }

  gotoSigninPage(event){
    event.preventDefault();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { UtilityService } from '../providers/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};

  constructor(
    private authSrvc: FirebaseAuthService,
    private router: Router,
    private util: UtilityService
    ) {
      
     }

  ngOnInit() {
    
    console.log('user')
        // console.log('user', user ? user.toJSON() : null)
  }

  ionViewDidEnter(){
    this.authSrvc.authState().subscribe(user => {
      user ? this.user = user.toJSON() : null;
    });
    console.log('user', this.user);
  }

}

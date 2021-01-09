import { Component, OnInit } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseAuthService } from './providers/firebase-auth.service';
import { Router } from '@angular/router';
import { UtilityService } from './providers/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isLogedIn: boolean = true;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'mail'
    },
    
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private FASrvc: FirebaseAuthService,
    private router: Router,
    private util: UtilityService,
    private loader: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authState();
  }

  ngOnInit() {
    //this.util.presentLoading();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  ionViewDidEnter() {
    //this.util.hideLoading();
  }

  authState(){

    this.loader.create({  
      message: 'Please wait...'  
    }).then((res) => {   
      res.present();  

      this.FASrvc.authState().subscribe(user => {
        user ? this.isLogedIn = true : this.isLogedIn = false;
        //console.log('user', user ? user.toJSON() : null)
        this.handleRoute();
      });

      this.loader.dismiss();
    });  

    
  }

  handleRoute(){
    const path = this.router.url.split('/')[1];
    if (this.isLogedIn && (path === 'login' || path === 'registration')) {
      //console.log(path);
      this.router.navigate(['/folder/inbox']);
    }
    if (!this.isLogedIn && path === 'profile') {
      this.util.defaultToast('Please log in to procced this action')
      this.router.navigate(['login']);
    }    
  }
  

  logout(){
    this.FASrvc.logout()
  }

}

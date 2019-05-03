import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    const firebaseConfig = {
      apiKey: "AIzaSyDYcdpt09OZ-XFPCUroiiSuK1bwniig1Ik",
      authDomain: "facial-analysis-750d1.firebaseapp.com",
      databaseURL: "https://facial-analysis-750d1.firebaseio.com",
      projectId: "facial-analysis-750d1",
      storageBucket: "facial-analysis-750d1.appspot.com",
      messagingSenderId: "646964186399"
    };
    
    firebase.initializeApp(firebaseConfig);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}

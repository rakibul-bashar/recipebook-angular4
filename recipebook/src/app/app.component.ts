import {Component, OnInit} from '@angular/core';
import * as firebase from  'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyA7zJ-x6DgSQkOvSJHHF0mPJWlQXQ8Goac",
      authDomain: "rakib-test-aj.firebaseapp.com"
    })
  }
  loadedfeature= 'rr'
  onNavigate(feature:string){
    this.loadedfeature=feature;
  }
}

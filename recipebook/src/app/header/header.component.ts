import {Component} from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent{
  constructor(private datastorageservice:DataStorageService,private authservice:AuthService,private router:Router){}
  onSave(){
    this.datastorageservice.storeRecipe()
      .subscribe(
        (response:Response)=>{
          console.log(response);
        }
      )

  }
  onfetchdata(){
    this.datastorageservice.getRecipes();
  }
  onLogOut(){

    this.authservice.logout();
    this.router.navigate(['/signin']);

  }
}

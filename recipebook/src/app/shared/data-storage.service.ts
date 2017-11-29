import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";
@Injectable()
export class DataStorageService{

  constructor (private http:Http,private recipeService:RecipeService, private authservice:AuthService){}
  storeRecipe(){
    const token=this.authservice.getToken();
      return this.http.put('https://rakib-test-aj.firebaseio.com/recipe.json?auth=' + token,this.recipeService.getRecipes());
  }
  getRecipes(){
    const token=this.authservice.getToken();
    this.http.get('https://rakib-test-aj.firebaseio.com/recipe.json?auth=' + token)
      .map(
        (response:Response)=>{
          const recipes:Recipe[]=response.json();
          for (let recipe of recipes){
            if(!recipe["ingredients"]){
              console.log(recipe);
              recipe["ingredients"]=[];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes:Recipe[])=>{

          this.recipeService.setRecipes(recipes)
        }
      )
  }
}

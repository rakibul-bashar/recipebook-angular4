import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {AuthService} from "../../auth/auth.service";
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;

  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router,private authservice:AuthService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.recipe=this.recipeService.getRecipe(this.id)


        }
      )
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)

  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})

  }
  ondeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
  }
}

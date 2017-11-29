
import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService{
  recipechanged= new Subject<Recipe[]>();
  private recipes: Recipe[]=[
    new Recipe('A te recipe','Some description','https://i.amz.mshcdn.com/qX2hr9KSInN_NC51oYyr_dztgtw=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2013%2F04%2Fonline-recipe-sources-640x360.jpg',[
      new Ingredient('rajib',1),
      new Ingredient('rab',12),
    ]),
    new Recipe('A Different recipe','Some description','https://i.amz.mshcdn.com/qX2hr9KSInN_NC51oYyr_dztgtw=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2013%2F04%2Fonline-recipe-sources-640x360.jpg',[
      new Ingredient('allah',1),
      new Ingredient('vorosa',100),
    ])

  ];
  constructor(private shoppingservice:ShoppingService){}
  setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipechanged.next(this.recipes.slice());



  }
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(id:number){
    return this.recipes[id]
  }
  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.shoppingservice.addIngredientss(ingredients)
  }
  addrecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipechanged.next(this.recipes.slice());

  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipechanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipechanged.next(this.recipes.slice())
  }
}

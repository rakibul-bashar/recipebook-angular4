import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
export class ShoppingService{
  ingredientChanged=new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  ingredients: Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoe',3),
  ];
  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  OnIngredientAdded(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredientss(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
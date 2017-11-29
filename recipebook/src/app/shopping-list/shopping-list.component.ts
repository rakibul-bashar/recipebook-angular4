import { Component, OnInit,OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[];
  private subscription:Subscription;
  constructor(private shoppingservice:ShoppingService) { }

  ngOnInit() {
    this.ingredients=this.shoppingservice.getIngredients();
    this.subscription=this.shoppingservice.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=> {
        this.ingredients=ingredients;
      }
    )
  }
  onEditItem(index:number){
    this.shoppingservice.startEditing.next(index);

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

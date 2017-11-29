import { Component,ViewChild, OnInit,OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription
  editmode=false;
  editingitemIndex:number;
  eiditedItem:Ingredient;

  constructor(private shoppingservice:ShoppingService) { }
  ngOnInit() {
    this.subscription=this.shoppingservice.startEditing.subscribe(
      (index:number)=>{
        this.editingitemIndex=index;
        this.editmode=true;
        this.eiditedItem=this.shoppingservice.getIngredient(index);
        this.slForm.setValue({
          name:this.eiditedItem.name,
          amount:this.eiditedItem.amount
        })

      }
    );
  }

  Onsubmit(form:NgForm){
    const value=form.value;

    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editmode){
      this.shoppingservice.updateIngredient(this.editingitemIndex,newIngredient)
    }else{
      this.shoppingservice.OnIngredientAdded(newIngredient);
    }

    this.editmode=false;
    form.reset();

  };
  ondelete(){
    this.shoppingservice.deleteIngredient(this.editingitemIndex)
    this.onClear();
  }
  onClear(){
    this.slForm.reset();
    this.editmode=false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

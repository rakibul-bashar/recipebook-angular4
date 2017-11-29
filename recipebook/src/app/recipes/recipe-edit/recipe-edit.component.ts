import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {FormGroup,FormControl,FormArray,Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,private recipeservice: RecipeService, private router:Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id=+params['id']
          this.editMode=params['id'] !=null;
          this.initForm();
        }
      )
  }
  onSubmit(){
    if(this.editMode){
      this.recipeservice.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
        this.recipeservice.addrecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onAddingredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })

  )
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  private initForm(){
    let reciepeName='';
    let repcipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);
    if(this.editMode){
      const recipe =this.recipeservice.getRecipe(this.id)
      reciepeName=recipe.name;
      repcipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }

    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(reciepeName,Validators.required),
      'imagePath':new FormControl(repcipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });

  }

}

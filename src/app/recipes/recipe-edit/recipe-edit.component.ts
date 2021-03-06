import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number
  editMode=false
  recipeForm:FormGroup
  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id= +params['id']
      console.log(this.editMode)
      this.editMode=params['id']!=null
      console.log(this.editMode)
      console.log(this.id)
      console.log(params)
      this.initForm()
    })
  }

  onSubmit(){
    //   const newRecipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // )  optional instead this.recipeForm.value
    console.log("recipe form value :", this.recipeForm.value)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  private initForm(){
  
    let recipeName='';
    let recipeImagePath=''
    let recipeDescription=''
    let recipeIngredients=new FormArray([])
    console.log("edit mode :",this.editMode)
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id)
      recipeName=recipe.name
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description
    
      console.log("ingredients :",recipe['ingredient'])
      if(recipe['ingredient']){
        
        for(let ingredient of recipe.ingredient){
          console.log("name :",ingredient.name)
          console.log("amount :",ingredient.amount)

          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,
                [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)

              ])
            })
          )
        }
        console.log(recipeIngredients)
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    })
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new  FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
      })
    )
  }

onCancel(){
this.router.navigate(['../'],{relativeTo:this.route})
}

onDeleteIngredient(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
}
 
}


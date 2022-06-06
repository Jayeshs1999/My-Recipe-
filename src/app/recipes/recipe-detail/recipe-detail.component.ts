import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number;
isOpen=false
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id']
      this.recipe=this.recipeService.getRecipe(this.id)
    })
  }
  onAddToShoppingList(){
    console.log("onAddToShoppingList :",this.recipe.ingredient)
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredient)
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route})
    // this.router.navigate(['../',this.id,"edit"],{relativeTo: this.route})
    //  ()../) up one level  (recipe/)
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}

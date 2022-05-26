import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShopppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
    public recipeSelected=new EventEmitter<Recipe>();
   private recipes:Recipe[]=[
        new Recipe("Taste Schnitzel","this is recipe","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
        [
           new Ingredient('Meat',1),
           new Ingredient('French Fries',20)
        ]),
        new Recipe("Big Fat Burger","this is recipe","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
        [
         new Ingredient('buns',2),
         new Ingredient('Meat',1)
        ])
      ];

      constructor(private slService:ShopppingListService){}
      getRecipes(){
         return this.recipes.slice()
      }

      addIngredientToShoppingList(ingredients:Ingredient[] ){
         this.slService.addIngredient(ingredients)
      }


}
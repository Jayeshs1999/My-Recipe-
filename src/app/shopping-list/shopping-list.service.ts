
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShopppingListService{

    ingredientChanged=new EventEmitter<Ingredient>()
    private ingredients:Ingredient[]=[
        new Ingredient("Apples",5),
        new Ingredient("Tomato",10),
      ];

      getIngredients(){
          return this.ingredients
      }

      addIngredients(ingredient:Ingredient){
        this.ingredients.push(ingredient)
      }

      addIngredient(ingredient:Ingredient[]){
       this.ingredients.push(...ingredient)
      //  this.ingredientChanged.emit(this.)


      }
}
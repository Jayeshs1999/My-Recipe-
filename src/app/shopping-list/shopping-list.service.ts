
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShopppingListService{
    startedEditing=new Subject<number>()
    ingredientChanged=new Subject<Ingredient[]>()
    private ingredients:Ingredient[]=[
        new Ingredient("Apples",5),
        new Ingredient("Tomato",10),
      ];

      getIngredients(){
          return this.ingredients
      }

      getIngredient(index:number){
        return this.ingredients[index]
      }
      
      addIngredients(ingredient:Ingredient){
        this.ingredients.push(ingredient)
      }

      addIngredient(ingredient:Ingredient[]){
        console.log("ingredient :",ingredient)
        for(let ingredients of ingredient){
          console.log("ingredients :",ingredients)
          this.ingredients.push(ingredients)
        }
      }

      updateIngredients(index:number,newIngredients:Ingredient){
        this.ingredients[index]=newIngredients
        this.ingredientChanged.next(this.ingredients)
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index,1)
        this.ingredientChanged.next(this.ingredients)
      }
      
}
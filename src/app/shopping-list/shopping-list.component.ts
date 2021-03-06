import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShopppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  constructor(private shoppingListService:ShopppingListService) { }

  ngOnInit(): void {
   this.ingredients= this.shoppingListService.getIngredients()
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }
}

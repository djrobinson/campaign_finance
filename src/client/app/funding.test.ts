import { Component, View, NgFor } from 'angular2/core';

@Component({
    selector: 'Product-Order',
    template: 'Product Quantity - <input type="number"  [(ngModel)] = "productQuantity">' +
    '<br>Product Quantity Ordered  - {{productQuantity}}'
})

export class FundingTest {
 Product=[];
    productQuantity: int;
    constructor() {
          this.productQuantity=5;
    }
}
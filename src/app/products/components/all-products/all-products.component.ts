import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {


  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];



  constructor(private service:ProductsService ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }



  getProducts() {

    this.loading = true;
    this.service.getAllProducts().subscribe((res:any) => {

      this.products = res;
      this.loading = false;
    },
      error => {
        console.log(error.message)
      }
    );
  }


  getCategories() {

    this.loading = true;

    this.service.getAllCategories().subscribe((res:any) => {

      this.loading = false;

     // console.log(this.categories);
      this.categories = res;
    },
      error => {

        this.loading = false;
        console.log(error);
      }
    );
  }


  filterCategory(event: any)
  {
    let value = event.target.value;  // talk change to select
    //console.log(value);
    value == 'all'? this.getProducts():this.getProductsCategory(value);


    
  }

  
  getProductsCategory(keyword: string) {
    this.loading = true;

    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false;

      this.products = res;
    });
  }


  addToCart(event: any) {
    
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);// ! for skip null
      let exist = this.cartProducts.find(item => item.item.id== event.item.id);

      if (exist) {
        alert('Product is already in cart!');
      }
      else {
        this.cartProducts.push(event);
        localStorage.setItem(
          'cart', JSON.stringify(
            this.cartProducts));
       }

    } else {
      this.cartProducts.push(event);
      localStorage.setItem(
        'cart', JSON.stringify(
          this.cartProducts));
    }
    //JSON.stringify // ابعت الداتا زي ماهي جايه send data
    //JSON.parse //Rcieve data
  }




}






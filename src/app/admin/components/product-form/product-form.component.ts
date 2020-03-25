import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories;
  id;
  product={
    title:null,
    category:null,
    price:null,
    imageUrl:null
  };
  constructor(private router:Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private productService:ProductService) {
    //console.log("new form");

    this.categories= categoryService.getAll()["categories"];
   // console.log(this.categories);
   this.id=this.route.snapshot.paramMap.get("id");
   if(this.id){
     this.productService.get(this.id).pipe(take(1)).subscribe(product=>{
        console.log(product);
        this.product=product;
     });
   }
   }

   save(product){
     //console.log(product);
    if(this.id){
      this.productService.update(this.id,product);
    }else{
      this.productService.create(product);
    }


     this.router.navigate(['/admin/products']);
   }

   delete(){
     if(confirm('Are you sure you want to delete this product ?')){
        this.productService.delete(this.id);
        this.router.navigate(['/admin/products']);
     }
   }



  ngOnInit(): void {
  }

}

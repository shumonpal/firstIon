import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../providers/products/product.service';
import { UtilityService } from '../providers/utility.service';
import { AddProductPage } from "../add-product/add-product.page";
import { Router } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  itemSpinner:boolean = true;

  products: any = [];
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    pager: true,
    speed:2000,
    loop:true
   };

  constructor(
    private pdtSrvc: ProductService,
    private utility: UtilityService,
    public modalController: ModalController,
    public router: Router,
    public storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.allProducts();
  }

  allProducts(){
    this.pdtSrvc.getProducts().subscribe(products => {
      this.itemSpinner = false;
      this.products =  products;
    }, (error) => {
      this.itemSpinner = false;
      this.utility.defaultToast(error.message);
    });
  }

  async showModal(){
    const modal = await this.modalController.create({
      component: AddProductPage
    });
    return await modal.present();
  }

  dismissModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  productDetails(id){
    this.router.navigate(['product-details', id])
  }

  productDelete(id, image){

    this.storage.storage.refFromURL(image).delete().then( res => {
      this.pdtSrvc.delete(id).then(() => {
        this.utility.defaultToast("Product deleted successfull");
      }).catch(error => {
        this.utility.defaultToast(error.message);
      });
    }).catch(error => {
      this.utility.defaultToast(error.message);
    });
    // storageRef.child(image)
    
  }

}

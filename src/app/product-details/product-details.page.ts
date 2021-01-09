import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ADDPRODUCT } from '../constants/formErrorMessage';
import { HelpersService } from '../providers/helpers.service';
import { ProductService } from '../providers/products/product.service';
import { UtilityService } from '../providers/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  productId: any = '';
  product: any = {};
  itemSpinner:boolean = true;

  //edit product
  editProduct$:boolean = false;
  editProductForm: FormGroup;
  showSpinner: boolean = false;
  formErrorMsg:any = {
      name: '',
      price: '',
      brand: '',
      size: '',
      image: '',
  };

  msgConst: any = ADDPRODUCT;

  constructor(
    private actiRouter: ActivatedRoute,
    private pdtSrvc: ProductService,
    private utility: UtilityService,
    private helpers: HelpersService
  ) { 
    
   }

  ngOnInit() {
    this.actiRouter.params.subscribe(param => {
      this.productId = param.id;
      this.getProduct();
    });
    this.createForm();
  }

 
  getProduct(){
    this.pdtSrvc.productById(this.productId).then(document => {
      this.product = document.data();
      this.itemSpinner = false;
    }).catch(error => {this.utility.defaultToast(error.message);
      this.utility.defaultToast(error.message);
    });
  }


  //update product
  createForm(){
    this.editProductForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
        price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        brand: new FormControl('', [Validators.required, Validators.maxLength(80)]),
        size: new FormControl('', [Validators.required]),
    });
    this.editProductForm.valueChanges.subscribe((data) => {
      this.formErrorMsg = this.helpers.formValidationMsg(this.editProductForm, this.msgConst, this.formErrorMsg)
      
    });
  }
  updateProduct(){
    //console.log(this.editProductForm.value)
    this.showSpinner = true;
    const formData = {};
    for (let key in this.editProductForm.controls) {
      if (this.editProductForm.controls[key].dirty) {
        formData[key] =  this.editProductForm.controls[key].value;        
      }
    }    
    this.pdtSrvc.updateProduct(this.productId, formData).then(res => {
      this.utility.defaultToast("Product updated successfull");
      this.getProduct();
      this.editProduct$ = false;
      this.showSpinner = false;
      // console.log(res)
    });
  }
  editProduct(){
    this.editProduct$ = true;    
    this.setFormValue();
  }
  
  setFormValue(){
    for (let key in this.editProductForm.controls) {
      this.editProductForm.controls[key].setValue(this.product[key]);      
    }
  }

  cancelEdit(){
  }

  

}

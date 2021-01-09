import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ADDPRODUCT } from "../constants/formErrorMessage";
import { HelpersService } from '../providers/helpers.service';
import { ProductService } from '../providers/products/product.service';
import { UtilityService } from '../providers/utility.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  showSpinner: boolean = false;
  addProductForm: FormGroup;
  formErrorMsg:any = {
      name: '',
      price: '',
      brand: '',
      size: '',
      image: '',
  };

  msgConst: any = ADDPRODUCT;

  // selectedFile: File = null;
  imageURL: any = '';

  downloadURL: Observable<string>;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private helpers: HelpersService,
    private pdtSrvc: ProductService,
    private utility: UtilityService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.addProductForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
        price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        brand: new FormControl('', [Validators.required, Validators.maxLength(80)]),
        size: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });
    this.addProductForm.valueChanges.subscribe((data) => {
      this.formErrorMsg = this.helpers.formValidationMsg(this.addProductForm, this.msgConst, this.formErrorMsg)
      
    });
  }


  saveProduct(event){
    this.showSpinner=true;
    this.uploadImageAddProduct(event.target.image.files[0]);
    
  }

  uploadImageAddProduct(file){
    var n = Date.now();
    const filePath = `products/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`products/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.imageURL = url;
              this.addProductDetails();
            }
            // console.log('image', this.imageURL);
          });
        })
      )
      .subscribe();
    
    // return  fileRef.getDownloadURL();
  }

  addProductDetails(){
    const formData = {
      name: this.addProductForm.controls.name.value,
      price: this.addProductForm.controls.price.value,
      brand: this.addProductForm.controls.brand.value,
      size: this.addProductForm.controls.size.value,
      image: this.imageURL
    };
    // console.log('formData', formData);
    this.pdtSrvc.addProduct(formData).then((res) => {
      this.dismissModal();
      this.router.navigate(['']);
      this.utility.defaultToast("Product Added successfull");
      this.showSpinner = true;
    }).catch((error) => {
      this.utility.defaultToast(error.message);
      this.showSpinner = true;
    });
    
  }

  dismissModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  

}

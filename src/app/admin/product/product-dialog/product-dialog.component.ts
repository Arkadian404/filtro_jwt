import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../service/product.service";

import {CategoryService} from "../../../service/category.service";
import {FlavorService} from "../../../service/flavor.service";
import {SaleService} from "../../../service/sale.service";
import {Category} from "../../../shared/models/category";
import {Flavor} from "../../../shared/models/flavor";
import {Sale} from "../../../shared/models/sale";
import {finalize} from "rxjs";
import {ref, getDownloadURL, Storage, uploadBytes, uploadBytesResumable} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import firebase from "firebase/compat";
import StorageErrorCode = firebase.storage.StorageErrorCode;


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss', '../../reusable/dialog.scss']
})
export class ProductDialogComponent implements OnInit{
  // @ts-ignore
  form: FormGroup;
  categories:Category[] = [];
  flavors:Flavor[] = [];
  sales:Sale[] = [];
  // @ts-ignore
  selectedImage: File;

  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private saleService:SaleService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private storage: Storage){
  }

  ngOnInit(): void {
    this.getCategories();
    this.getFlavors();
    this.getSales();
    this.form = this.formBuilder.group({
      name : '',
      quantity: '',
      sold: '',
      price: '',
      flavor:'',
      description : '',
      image: '',
      status: false,
      sale: '',
      category: ''
    });
    if (this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  getCurrentDateTime(){
    // return new Date(Date.now()).toLocaleString().replace(',', ' -');
    return formatDate(new Date(), 'dd-MM-yyyyTHH:MM:SSa', 'en-us');
  }

  onFileChange(event:any){
    if(event.target.files && event.target.files.length){
      this.selectedImage = event.target.files[0] as File;
      console.log(this.selectedImage);
    }
  }

  getCategories(){
    return this.categoryService.getCategoryList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.categories = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getFlavors(){
    return this.flavorService.getFlavorList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.flavors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getSales(){
    return this.saleService.getSaleList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.sales = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  // onSubmit(){
  //   if(this.form.valid){
  //     if(this.data){
  //       this.productService.updateProduct(this.data.id, this.form.value).subscribe({
  //         next:(data)=>{
  //           this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
  //           this.matDialog.close(true);
  //           console.log(this.form);
  //         },
  //         error:(err)=>{
  //           this.utilService.openSnackBar(err, 'Đóng');
  //         }
  //       })
  //     }else{
  //       this.productService.createProduct(this.form.value).subscribe({
  //         next:() => {
  //           this.utilService.openSnackBar('Thêm thành công', 'Đóng');
  //           this.matDialog.close(true);
  //           console.log(this.form)
  //         },
  //         error:(err) => {
  //           this.utilService.openSnackBar(err, 'Đóng');
  //         }
  //       })
  //     }
  //   }
  // }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        const imgName = this.getCurrentDateTime() + this.selectedImage.name;
        const storageRef = ref(this.storage, `coffee/${imgName}`);
        const uploadTask = uploadBytesResumable(storageRef, this.selectedImage);
        uploadTask.on('state_changed', (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (err)=>{
            this.utilService.openSnackBar(err.message, 'Đóng');
            console.log(err);
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              console.log('File available at', downloadURL);
              this.form.value.image = downloadURL;
              this.productService.updateProduct(this.data.id, this.form.value).subscribe({
                next:(data)=>{
                  this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
                  this.matDialog.close(true);
                  console.log(this.form);
                },
                error:(err)=>{
                  this.utilService.openSnackBar(err, 'Đóng');
                }
              })
            })
          })
      }else{
        const imgName = this.getCurrentDateTime() + this.selectedImage.name;
        const storageRef = ref(this.storage, `coffee/${imgName}`);
        const uploadTask = uploadBytesResumable(storageRef, this.selectedImage);
        uploadTask.on('state_changed', (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
          (err)=>{
            this.utilService.openSnackBar(err.message, 'Đóng');
            console.log(err);
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              console.log('File available at', downloadURL);
              this.form.value.image = downloadURL;
              this.productService.createProduct(this.form.value).subscribe({
                next:() => {
                  this.utilService.openSnackBar('Thêm thành công', 'Đóng');
                  this.matDialog.close(true);
                  console.log(this.form)
                },
                error:(err) => {
                  this.utilService.openSnackBar(err, 'Đóng');
                }
              })
            })
          })
      }
    }
  }


}

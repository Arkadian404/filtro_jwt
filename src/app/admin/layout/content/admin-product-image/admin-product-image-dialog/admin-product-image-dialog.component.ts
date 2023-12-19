import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../../../service/util.service";
import {CategoryService} from "../../../../../service/product/category.service";
import {ProductService} from "../../../../../service/product/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../../shared/models/product/category";
import {Product} from "../../../../../shared/models/product/product";
import {formatDate} from "@angular/common";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {ProductImageService} from "../../../../../service/product/product-image.service";
import {ProductImage} from "../../../../../shared/models/product/product-image";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './admin-product-image-dialog.component.html',
  styleUrls: ['./admin-product-image-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductImageDialogComponent implements OnInit{
  isLoading = false;
  form!:FormGroup;
  categories:Category[] = [];
  products:Product[] = [];
  selectedCategory:Category;
  selectedImages:File[] =[];
  uploadImagesObservable = [];


  constructor(private formBuilder:FormBuilder,
              private categoryService:CategoryService,
              private productService:ProductService,
              private productImageService:ProductImageService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminProductImageDialogComponent>,
              private storage: Storage,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }


  ngOnInit(): void {
    this.getCategories();
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      status: [true],
    })
    if(this.data){
      this.form.patchValue(this.data);
      this.selectedCategory = this.data.product.category;
      this.onCategoryChange(this.selectedCategory);
    }
  }


  onCategoryChange(selectedCategory:Category){
    this.productService.getAdminProductsByCategory(selectedCategory.id).subscribe(
      {
        next:(data)=>{
          this.products = data
          console.log(data);
        },
        error: err=>{
          this.products = [];
          console.log(err);
        }
      }
    )
  }

  onFileChange(event:any){
    if(event.target.files.length > 0 && event.target.files){
      for(const element of event.target.files) {
        this.selectedImages.push(element);
        console.log(this.selectedImages);
      }
    }
  }

  getCategories(){
    return this.categoryService.getAdminCategoryList()
      .subscribe({
        next:(data)=>{
          this.categories = data;
        },
        error:(err)=>{
          this.categories = [];
          this.utilService.openSnackBar(err, 'Đóng');
        }
      })
  }
  onSubmit(){
    if(this.form.valid){
      if(this.data){
        if(this.selectedImages){
          this.isLoading = true;
          for(const element of this.selectedImages) {
            const imagePath = this.form.value.product.name;
            const image$ = this.uploadProductWithImage(element, imagePath);
            this.uploadImagesObservable.push(image$);
          }
          forkJoin(this.uploadImagesObservable).subscribe({
            next: (data) => {
              this.isLoading = false;
              this.utilService.openSnackBar('Cập nhật ảnh thành công', 'Đóng');
              this.matDialog.close(true);
            },
            error: (err) => {
              this.utilService.openSnackBar(err, 'Đóng');
            }
          });
        }else{
          this.updateProductImage(this.data.id, this.form.value);
        }
      }else if (this.selectedImages) {
        this.isLoading = true;
        for (const element of this.selectedImages) {
          const imagePath = this.form.value.product.name;
          console.log('creatImage: ' + element.name);
          const image$ = this.createProductImageWithImage(element, imagePath);
          this.uploadImagesObservable.push(image$);
        }
        forkJoin(this.uploadImagesObservable).subscribe({
          next: (data) => {
            this.isLoading = false;
            this.utilService.openSnackBar('Thêm ảnh thành công', 'Đóng');
            this.matDialog.close(true);
          },
          error: (err) => {
            this.utilService.openSnackBar(err, 'Đóng');
          }
        });
      } else {
        this.createProductImage(this.form.value);
        console.log(this.form.value)
      }
    }
  }
  getCurrentDateTime(){
    // return new Date(Date.now()).toLocaleString().replace(',', ' -');
    return formatDate(new Date(), 'dd-MM-yyyyTHH:MM:SSa', 'en-us');
  }

  uploadProductWithImage(image:File, pathName?:string){
    let imgName = this.getCurrentDateTime() + image.name;
    let storageRef = ref(this.storage, `coffee/${pathName}/${imgName}`);
    let uploadTask = uploadBytesResumable(storageRef, image);
    this.form.value.imageName = imgName;
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (err)=>{
          this.utilService.openSnackBar(err.message, 'Đóng');
          console.log(err);
          reject(err);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            console.log('File available at', downloadURL);
            this.form.value.url = downloadURL;
            this.form.value.imageName = imgName;
            console.log('upload imageName function: '+ this.form.value.imageName);
            resolve(this.updateProductImage(this.data.id, this.form.value));
          })
        })
    });

  }

  updateProductImage(id: number, image: ProductImage){
    return  this.productImageService.updateProductImage(id, image).subscribe({
      next:(data) => {
        this.utilService.openSnackBar(data.message, 'Đóng')
        this.matDialog.close(true);
        console.log(this.form)
      },
      error:(err) => {
        this.utilService.openSnackBar(err.message, 'Đóng');
        console.log(err);
      }
    })
  }

  createProductImageWithImage(image:File, imagePath?:string){
    let imgName = this.getCurrentDateTime() + image.name;
    let storageRef = ref(this.storage, `coffee/${imagePath}/${imgName}`);
    let  uploadTask = uploadBytesResumable(storageRef, image);
    this.form.value.imageName = imgName;
    console.log('imageName from function() 1: '+ this.form.value.imageName);
    console.log(this.form.value)
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (err)=>{
          this.utilService.openSnackBar(err.message, 'Đóng');
          console.log(err);
          reject(err);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            console.log('File available at', downloadURL);
            this.form.value.url = downloadURL;
            this.form.value.imageName = imgName;
            console.log('imageName from function() 2: '+ this.form.value.imageName);
            resolve(this.createProductImage(this.form.value));
          });
        });
    });

  }

  createProductImage(image:ProductImage){
    return  this.productImageService.createProductImage(image).subscribe({
      next:(data) => {
        // this.utilService.openSnackBar(data.message, 'Đóng');
        // this.matDialog.close(true);
        console.log(this.form)
      },
      error:(err) => {
        // this.utilService.openSnackBar(err.message, 'Đóng');
        console.log(err);
      }
    })
  }
  public compareObjectFn = function (object, value):boolean{
    if (object == null || value == null){
      return !![];
    }
    return object.id === value.id;
  }



}

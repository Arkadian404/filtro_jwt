import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../../../service/util.service";
import {CategoryService} from "../../../../../service/category.service";
import {ProductService} from "../../../../../service/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../../../../shared/models/category";
import {Product} from "../../../../../shared/models/product";
import {formatDate} from "@angular/common";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {ProductImageService} from "../../../../../service/product-image.service";
import {ProductImage} from "../../../../../shared/models/product-image";

@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './admin-product-image-dialog.component.html',
  styleUrls: ['./admin-product-image-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductImageDialogComponent implements OnInit{

  form!:FormGroup;
  categories:Category[] = [];
  products:Product[] = [];
  selectedCategory:Category;
  selectedImages:File[] =[];


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
      product: '',
      status: true,
    })
    if(this.data){
      this.form.patchValue(this.data);
      this.selectedCategory = this.data.product.category;
      this.onCategoryChange(this.selectedCategory);
    }
  }


  // products$ = this.categoryControl.valueChanges.pipe(
  //   startWith(this.categoryControl.value),
  //   switchMap((category)=>{
  //     this.form.get('product').reset();
  //     if(!category){
  //       return of([]);
  //     }else{
  //       return this.productService.getProductsByCategory(category.id).pipe(
  //         tap((products)=>{
  //           console.log(products);
  //         })
  //       )
  //     }
  //   })
  // )

  onCategoryChange(selectedCategory:Category){
    this.productService.getProductsByCategory(selectedCategory.id).subscribe(
      {
        next:(data)=>{
          this.products = data
          console.log(data);
        },
        error: err=>{
          console.log(err);
        }
      }
    )
  }

  onFileChange(event:any){
    if(event.target.files.length > 0 && event.target.files){
      for(let i=0; i<event.target.files.length;i++){
        this.selectedImages.push(event.target.files[i]);
        console.log(this.selectedImages);
      }
    }
  }

  getCategories(){
    return this.categoryService.getCategoryList()
      .subscribe({
        next:(data)=>{
          this.categories = data;
        },
        error:(err)=>{
          this.utilService.openSnackBar(err, 'Đóng');
        }
      })
  }
  onSubmit(){
    if(this.form.valid){
      if(this.data){
        if(!!this.selectedImages){
          for(let i =0 ;i <this.selectedImages.length; i++){
            const imagePath = this.form.value.product.name;
            this.uploadProductWithImage(this.selectedImages[i], imagePath);
          }
        }else{
          this.updateProductImage(this.data.id, this.form.value);
        }
      }else{
        if(!!this.selectedImages){
          for(let i =0 ;i <this.selectedImages.length; i++){
            const imagePath = this.form.value.product.name;
            this.createProductImageWithImage(this.selectedImages[i], imagePath);
          }
        }else{
          this.createProductImage(this.form.value);
          console.log(this.form.value)
        }
      }
    }
  }
  getCurrentDateTime(){
    // return new Date(Date.now()).toLocaleString().replace(',', ' -');
    return formatDate(new Date(), 'dd-MM-yyyyTHH:MM:SSa', 'en-us');
  }

  uploadProductWithImage(image:File, pathName?:string){
    const imgName = this.getCurrentDateTime() + image.name;
    const storageRef = ref(this.storage, `coffee/${pathName}/${imgName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    this.form.value.imageName = imgName;
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
          this.form.value.url = downloadURL;
          this.updateProductImage(this.data.id, this.form.value);
        })
      })
  }

  updateProductImage(id: number, image: ProductImage){
    this.productImageService.updateProductImage(id, image).subscribe({
      next:() => {
        this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
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
    const imgName = this.getCurrentDateTime() + image.name;
    const storageRef = ref(this.storage, `coffee/${imagePath}/${imgName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    this.form.value.imageName = imgName;
    console.log(this.form.value)
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
          this.form.value.url = downloadURL;
          this.createProductImage(this.form.value);
          console.log(this.form.value)
          console.log(this.form.get('product').getRawValue())
        })
      })
  }

  createProductImage(image:ProductImage){
    this.productImageService.createProductImage(image).subscribe({
      next:() => {
        this.utilService.openSnackBar('Tạo thành công', 'Đóng')
        this.matDialog.close(true);
        console.log(this.form)
      },
      error:(err) => {
        this.utilService.openSnackBar(err.message, 'Đóng');
        console.log(err);
      }
    })
  }


  public compareObjectFn = function (object, value){
    return object.id === value.id;
  }

}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReviewService} from "../../../../../service/product/review.service";
import {ReviewDto} from "../../../../../shared/dto/review-dto";
import {UserDto} from "../../../../../shared/dto/user-dto";
import {ProductDto} from "../../../../../shared/dto/product-dto";
import {ActiveReview} from "../../../../../shared/utils/active-review";
import {ActiveReviewTypeEnum} from "../../../../../shared/utils/active-review-type-enum";
import {UtilService} from "../../../../../service/util.service";
import {ReviewRating} from "../../../../../shared/models/statistic/review-rating";
import {ProductService} from "../../../../../service/product/product.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnChanges{
  @Input() user:UserDto;
  @Input() product:ProductDto;
  ratingProduct:ProductDto;
  canReview = true;
  reviews: ReviewDto[] = [];
  replies: ReviewDto[] = [];
  activeReview: ActiveReview | null = null;
  activeReviewTypeEnum = ActiveReviewTypeEnum;
  reviewCount:number = 0;
  reviewsRating:ReviewRating[] = [
    {rating: 1, count: 0},
    {rating: 2, count: 0},
    {rating: 3, count: 0},
    {rating: 4, count: 0},
    {rating: 5, count: 0}
  ];
  hasBoughtProduct = false;
  isUserReviewed = false;
  constructor(private reviewService:ReviewService,
              private productService:ProductService,
              private utilService:UtilService) {
  }


  ngOnInit(){
    this.canReview = !!this.user;
    this.checkHasBoughtProduct(this.user?.id, this.product?.id);
    this.checkUserReviewed(this.user?.id, this.product?.id);
    this.getAllReviewsByProductId(this.product?.id);
    this.getReviewCount(this.product?.id);
    this.getReviewsRating(this.product?.id);
    this.getProductDto(this.product?.id);

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.product){
      this.getAllReviewsByProductId(this.product?.id);
      this.getReviewCount(this.product?.id);
      this.getReviewsRating(this.product?.id);
      this.getProductDto(this.product?.id);
    }
  }

  getProductDto(id?:number){
    this.productService.getProductDtoById(id).subscribe({
      next: data => {
        this.ratingProduct = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getAllReviewsByProductId(id:number){
    this.reviewService.getReviewsByProductId(id)
      .subscribe({
      next: data => {
        this.reviews = data.filter(r=> r.parentId === null);
        this.replies = data
      },
      error: err => {
        console.log(err);
      }
    })
  }

  checkUserReviewed(userId:number, productId:number){
    if(this.user!==null){
      this.reviewService.isUserReviewed(userId, productId).subscribe({
        next: data => {
          this.isUserReviewed = data;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  calculateRating(rating:number){
    return this.utilService.calcStars(rating);
  }

  getReviewCount(id:number){
    return this.reviewService.getReviewProductCount(id).subscribe({
      next: data => {
        this.reviewCount = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  getReviewsRating(id:number){
    return this.reviewService.getReviewRating(id).subscribe({
      next: data => {
        data.forEach(item => {
          const index = this.reviewsRating.findIndex(r => r.rating == item.rating);
          this.reviewsRating[index].count = item?.count;
          console.log(this.reviewsRating);
        });
      },
      error: err => {
        console.log(err);
      },
    });
  }

  checkHasBoughtProduct(userId:number, productId:number){
    this.reviewService.hasUserBoughtProduct(userId, productId).subscribe(data=>{
      console.log(data)
      this.hasBoughtProduct = data;
    });
  }

  getReplies(id:number){
    return this.replies
      .filter(r=> r.parentId === id)
      .sort((a,b)=> new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds())
  }

  isReview(){
    if(!this.activeReview){
      return false;
    }
    return this.activeReview.type === this.activeReviewTypeEnum.review
  }

  onActiveReview(reply:ActiveReview){
    console.log(`onActiveReview:  ${reply.id} ${reply.type}`)
    this.activeReview = reply;
  }


  handleSubmitReview({content, parentId}: {content: any, parentId:number}){
    this.reviewService.createReview(content, parentId, this.product, this.user).subscribe({
      next: data => {
        this.getAllReviewsByProductId(this.product?.id);
        this.getReviewCount(this.product?.id);
        this.getReviewsRating(this.product?.id);
        this.getProductDto(this.product?.id);
        this.activeReview = null;
        this.utilService.openSnackBar(data.message, 'Đóng');
      },
      error: err => {
        this.utilService.openSnackBar(err, 'Đóng');
        console.log(err);
      }
    });
  }

  handleEditReview({content, reviewId}: {content: any, reviewId:number}){
    console.log(content, reviewId);
    console.log(`handleEdit:  ${reviewId}`)
    this.reviewService.updateReview(content, reviewId).subscribe({
      next: data => {
        this.getAllReviewsByProductId(this.product?.id);
        this.getReviewCount(this.product?.id);
        this.getReviewsRating(this.product?.id);
        this.getProductDto(this.product?.id);
        console.log(`calling in handle`);
        this.activeReview = null;
        this.utilService.openSnackBar(data.message, 'Đóng');
      },
      error: err => {
        this.utilService.openSnackBar(err, 'Đóng');
        console.log(err);
      }
    });
  }

  handleDeleteReview(id:number){
    console.log(`handleDelete:  ${id}`)
    this.reviewService.deleteReview(id).subscribe({
      next: data => {
        this.getAllReviewsByProductId(this.product?.id);
        this.getReviewCount(this.product?.id);
        this.getReviewsRating(this.product?.id);
        console.log(`calling in handle`);
        this.getProductDto(this.product?.id);
        this.activeReview = null;
        this.utilService.openSnackBar(data.message, 'Đóng');
      },
      error: err => {
        this.utilService.openSnackBar(err, 'Đóng');
        console.log(err);
      }
    });
  }

  handleActiveReview(review:ActiveReview){
    this.activeReview = review;
    console.log(this.activeReview);
  }

  protected readonly ActiveReviewTypeEnum = ActiveReviewTypeEnum;
}

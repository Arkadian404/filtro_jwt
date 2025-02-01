import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReviewService} from "../../../../../service/product/review.service";
import {UserDto} from "../../../../../shared/dto/user-dto";
import {ActiveReview} from "../../../../../shared/utils/active-review";
import {ActiveReviewTypeEnum} from "../../../../../shared/utils/active-review-type-enum";
import {UtilService} from "../../../../../service/util.service";
import {ReviewRating} from "../../../../../shared/models/statistic/review-rating";
import {ProductService} from "../../../../../service/product/product.service";
import {tap} from "rxjs";
import {ProductResponse} from "../../../../../shared/response/product-response";
import {ReviewResponse} from "../../../../../shared/response/review-response";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnChanges{
  @Input() user:UserDto;
  @Input() product:ProductResponse;
  ratingProduct:ProductResponse;
  canReview = true;
  reviews: ReviewResponse[] = [];
  replies: ReviewResponse[] = [];
  activeReview: ActiveReview | null = null;
  activeReviewTypeEnum = ActiveReviewTypeEnum;
  reviewCount = 0;
  reviewsRating:ReviewRating[] = [
    {rating: 1, count: 0},
    {rating: 2, count: 0},
    {rating: 3, count: 0},
    {rating: 4, count: 0},
    {rating: 5, count: 0}
  ];
  hasBoughtProduct = false;
  isUserReviewed = false;
  constructor(private readonly reviewService:ReviewService,
              private readonly productService:ProductService,
              private readonly utilService:UtilService) {
  }


  ngOnInit(){
    this.canReview = !!this.user;
    this.checkHasBoughtProduct(this.user?.id, this.product?.id);
    this.checkUserReviewed(this.user?.id, this.product?.id);
    this.getAllReviewsByProductId(this.product?.id);
    this.getReviewCount(this.product?.id);
    this.getReviewsRating(this.product?.id);
    this.getProduct(this.product?.id);

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.product){
      this.getAllReviewsByProductId(this.product?.id);
      this.getReviewCount(this.product?.id);
      this.getReviewsRating(this.product?.id);
      this.getProduct(this.product?.id);
    }
  }

  getProduct(id?:number){
    this.productService.getProductResponseById(id).subscribe({
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
      .pipe(tap(data => data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())))
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
    if(this.user!=null){
      this.reviewService.isUserReviewed(userId, productId).subscribe({
        next: data => {
          this.isUserReviewed = data;
          console.log(data)
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
    if(this.user!=null){
      this.reviewService.hasUserBoughtProduct(userId, productId).subscribe(data=>{
        this.hasBoughtProduct = data;
      });
    }
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
    this.reviewService.createReview(content, parentId, this.product.id, this.user.id).subscribe({
      next: data => {
        this.getAllReviewsByProductId(this.product?.id);
        this.getReviewCount(this.product?.id);
        this.getReviewsRating(this.product?.id);
        this.getProduct(this.product?.id);
        this.checkUserReviewed(this.user?.id, this.product?.id);
        this.activeReview = null;
        this.utilService.openSnackBar(data, 'Đóng');
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
        this.getProduct(this.product?.id);
        console.log(`calling in handle`);
        this.activeReview = null;
        this.utilService.openSnackBar(data, 'Đóng');
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
        this.getProduct(this.product?.id);
        this.activeReview = null;
        this.utilService.openSnackBar(data, 'Đóng');
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

}

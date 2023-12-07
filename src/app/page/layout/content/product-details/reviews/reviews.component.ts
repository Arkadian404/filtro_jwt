import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReviewService} from "../../../../../service/review.service";
import {ReviewDto} from "../../../../../shared/dto/review-dto";
import {UserDto} from "../../../../../shared/dto/user-dto";
import {ProductDto} from "../../../../../shared/dto/product-dto";
import {ActiveReview} from "../../../../../shared/utils/active-review";
import {map} from "rxjs";
import {ActiveReviewTypeEnum} from "../../../../../shared/utils/active-review-type-enum";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnChanges{
  @Input() user:UserDto;
  @Input() product:ProductDto;
  canReview = true;
  reviews: ReviewDto[] = [];
  replies: ReviewDto[] = [];
  activeReview: ActiveReview | null = null;
  activeReviewTypeEnum = ActiveReviewTypeEnum;

  constructor(private reviewService:ReviewService) {
  }


  ngOnInit(){
    this.canReview = !!this.user;
    this.getAllReviewsByProductId(this.product?.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.product){
      this.getAllReviewsByProductId(this.product?.id);
    }
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
    console.log(content, parentId);
    console.log(`handleSubmit:  ${parentId}`)
    this.reviewService.createReview(content, parentId, this.product, this.user).subscribe({
      next: data => {
        console.log(`calling in handle`);
       this.getAllReviewsByProductId(this.product?.id);
       this.activeReview = null;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleEditReview({content, reviewId}: {content: any, reviewId:number}){
    console.log(content, reviewId);
    console.log(`handleEdit:  ${reviewId}`)
    this.reviewService.updateReview(content, reviewId).subscribe({
      next: data => {
        this.getAllReviewsByProductId(this.product?.id);
        console.log(`calling in handle`);
        this.activeReview = null;
      },
      error: err => {}
    });
  }

  handleDeleteReview(id:number){
    console.log(`handleDelete:  ${id}`)
    this.reviewService.deleteReview(id).subscribe({
      next: data => {
        this.getAllReviewsByProductId(this.product?.id);
        console.log(`calling in handle`);
        this.activeReview = null;
      },
      error: err => {}
    });
  }

  handleActiveReview(review:ActiveReview){
    this.activeReview = review;
    console.log(this.activeReview);
  }

  protected readonly ActiveReviewTypeEnum = ActiveReviewTypeEnum;
}

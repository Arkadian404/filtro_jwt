import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActiveReviewTypeEnum} from "../../../../../../shared/utils/active-review-type-enum";
import {ActiveReview} from "../../../../../../shared/utils/active-review";
import * as moment from 'moment';
import {ProductResponse} from "../../../../../../shared/response/product-response";
import {ReviewResponse} from "../../../../../../shared/response/review-response";
import {UserResponse} from "../../../../../../shared/response/user-response";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  @Input() review:ReviewResponse;
  @Input() user:UserResponse;
  @Input() product:ProductResponse;
  @Input() replies:ReviewResponse[];
  @Input() activeReview:ActiveReview | null;
  @Input() parentId:number | null;
  @Input() starCount = 1;

  canReply = false;
  canEdit = false;
  canDelete = false;
  activeReviewTypeEnum = ActiveReviewTypeEnum;
  replyId:number | null = null;
  stars:number []|null = null;
  starsOff:number []|null = null;
  duration:any|null = null;

  @Output() setActiveReviewReply = new EventEmitter<ActiveReview | null>();
  @Output() setActiveReviewEdit = new EventEmitter<ActiveReview | null>();
  @Output() setActiveReviewDelete = new EventEmitter<any>();
  @Output() onReplyReview = new EventEmitter<any>();
  @Output() onEditReview = new EventEmitter<any>();
  @Output() onDeleteReview = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.canReply = !!this.user;
    this.canEdit = !!this.user && this.user?.id === this.review.user?.id;
    this.canDelete = !!this.user && this.user?.id === this.review.user?.id&& this.replies?.length === 0;
    this.replyId = this.parentId ? this.parentId : this.review?.id;
    this.stars = Array(this.starCount).map((_,i)=>i+1);
    this.starsOff = Array(5-this.starCount).map((_,i)=>i+1);
  }

  onActiveReply(reply: ActiveReview){
    this.setActiveReviewReply.emit(reply);
  }

  onActiveEdit(edit: ActiveReview){
    this.setActiveReviewEdit.emit(edit);
  }

  onActiveDelete(id:number){
    this.setActiveReviewDelete.emit(id);
    this.onDeleteReview.emit(id);
  }

  onSubmitReplyReview({content, parentId}:{content:string, parentId:number}){
    this.onReplyReview.emit({content, parentId});
  }

  onSubmitEditReview({content, reviewId}:{content:string, reviewId:number}){
    console.log(content, reviewId);
    this.onEditReview.emit({content, reviewId});
  }


  isReplying(){
    if(!this.activeReview){
      return false;
    }
    return this.activeReview?.id === this.review?.id &&
      this.activeReview.type === this.activeReviewTypeEnum.replying
  }


  isEditing(){
    if(!this.activeReview){
      return false;
    }
    return this.activeReview?.id === this.review?.id &&
      this.activeReview.type === this.activeReviewTypeEnum.editing
  }

}

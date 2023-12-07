import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReviewDto} from "../../../../../../shared/dto/review-dto";
import {UserDto} from "../../../../../../shared/dto/user-dto";
import {ProductDto} from "../../../../../../shared/dto/product-dto";
import {ActiveReviewTypeEnum} from "../../../../../../shared/utils/active-review-type-enum";
import {ActiveReview} from "../../../../../../shared/utils/active-review";
import * as moment from 'moment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  @Input() review:ReviewDto;
  @Input() user:UserDto;
  @Input() product:ProductDto;
  @Input() replies:ReviewDto[];
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

  processDate(){
    this.duration = moment.duration(moment().diff(moment(this.review.createdAt)));
    if(this.duration.asDays() > 1){
      return this.review.createdAt;
    }else{
      return this.duration.humanize().toString() + ' ago';
    }
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

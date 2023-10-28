import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit{
  @Input() submitLabel:string;
  @Input() hasCancelButton:boolean;
  @Input() rating:number = 1;
  @Input() comment:string ='';

  @Output() onReviewSubmitForm = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void >();
  form:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rating: this.rating,
      comment: [this.comment, Validators.required],
    })
  }

  onReviewForm(){
    this.onReviewSubmitForm.emit(this.form.value);
  }

  onCancelForm(){
    this.onCancel.emit();
  }

}

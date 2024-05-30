import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../../../service/email.service";
import {UtilService} from "../../../../service/util.service";

const TOKEN = 'pk.eyJ1IjoiemFmdXR2IiwiYSI6ImNsd3FqN3Q0ajAyd3cybW9pMTU2MjcxcWIifQ.4LZsqYraobv_QPMBmbbCfw';
const PHONE_PATTERN = /^\d{10,11}$|^0\d{9,10}$/;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  contactForm: FormGroup;
  spin = false;
  disabled = false;
  constructor(private formBuilder: FormBuilder,
              private emailService: EmailService,
              private utilService: UtilService){
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      content: ['', Validators.required]
    })
    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: 'contact-maps', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [106.77200560002353, 10.85116770749643], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    const marker = new mapboxgl.Marker({color: 'red'})
      .setLngLat([106.77200560002353, 10.85116770749643])
      .addTo(map);
  }


  onSubmit():void{
    if(this.contactForm.valid){
      this.spin = true;
      this.disabled = true;
      this.contactForm.disable();
      this.emailService.sendFeedbackMail(this.contactForm.value)
        .subscribe({
          next: () => {
            this.spin = false;
            this.disabled = false;
            this.contactForm.enable();
            this.contactForm.reset();
            this.contactForm.updateValueAndValidity();
            Object.keys(this.contactForm.controls).forEach(key => {
              this.contactForm.get(key).setErrors(null) ;
            });
            this.utilService.openSnackBar('Gửi phản hồi thành công', 'Đóng')
          },
          error: (error) => {
            this.spin = false;
            this.disabled = false;
            this.contactForm.enable();
            this.utilService.openSnackBar(error, 'Đóng')
          }
        })
    }
  }
}

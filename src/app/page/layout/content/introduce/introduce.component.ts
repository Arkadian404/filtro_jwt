import { Component } from '@angular/core';
import {RecommenderService} from "../../../../service/recommender.service";

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent {

  constructor(private service: RecommenderService) {
  }

  getFastAPI(){
    return this.service.testApi().subscribe(data=>{
      console.log(data);
    });
  }
}

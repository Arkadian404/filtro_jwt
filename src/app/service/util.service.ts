import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar:MatSnackBar,
              private zone: NgZone) { }


  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    this.zone.run(() => {
      this.snackBar.open(message, action, config);
    });
  }

  calcStars(starCount:number){
    if(starCount == 0){

    }
    if(starCount == 1){
      return Array(1).map((_,i)=>i+1);
    }
    return Array(Math.floor(starCount)).map((_,i)=>i+1);
  }

  // openSnackBar(message:string, action:string){
  //   this.snackBar.open(message, action, {
  //     duration: 2000,
  //     verticalPosition: 'top'
  //   });
  // }
}

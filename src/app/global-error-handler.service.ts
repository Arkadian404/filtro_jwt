import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(private snackbar:MatSnackBar,
              private zone: NgZone) { }

  handleError(error: any): void {
    this.zone.run(()=>{
      this.snackbar.open(
        "Error: " + error.message,
        "Close",
        {
          duration: 2000,
        }
      )
    })
    console.warn("Error handled by GlobalErrorHandlerService: " + error.message)
  }
}

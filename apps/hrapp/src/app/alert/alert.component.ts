import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})

export class AlertComponent {
 public serverErrors = [];
 public showFailureMsg = false;

 onError(err: string[]){
   this.showFailureMsg = true;
   this.serverErrors.push(err);
 }

}



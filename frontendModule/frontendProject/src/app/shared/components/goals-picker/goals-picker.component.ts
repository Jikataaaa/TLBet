import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-goals-picker',
  templateUrl: './goals-picker.component.html',
  styleUrls: ['./goals-picker.component.scss']
})
export class GoalsPickerComponent{
  @Input() goals!  : number;
  @Output() betGoals  = new EventEmitter<number>();
  constructor(){

  }

  

  incrementGoals() {
     this.goals++;
     this.betGoals.emit(this.goals)
  }
  decrementGoals() {
      if (this.goals == 0) {
        return;
      }
      this.goals--;
     this.betGoals.emit(this.goals)
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-goals-picker',
  templateUrl: './goals-picker.component.html',
  styleUrls: ['./goals-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GoalsPickerComponent,
    },
  ],
})
export class GoalsPickerComponent implements ControlValueAccessor {
  goals: number = 0;

  onChange = (value: number) => {
  };

  onTouched = () => {};

  touched = false;

  disabled = false;

  incrementGoals() {
    this.goals++;
    this.onChange(this.goals);
    this.onTouched();
  }
  decrementGoals() {
    if (this.goals == 0) {
      return;
    }
    this.goals--;
    this.onChange(this.goals);
    this.onTouched();
  }

  writeValue(goals: number) {
    this.goals = goals || 0;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

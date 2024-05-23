import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Match } from '../../interfaces/Match';

@Component({
  selector: 'app-match-proccess',
  templateUrl: './match-proccess.component.html',
  styleUrls: ['./match-proccess.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MatchProccessComponent,
    },
  ],
})
export class MatchProccessComponent implements ControlValueAccessor {
  onChange = (match: Match) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  match!: Match;

  writeValue(match: Match): void {
    this.match = match;
    this.onChange(match);
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}

import { Component } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Match } from 'src/app/services/match/models/Match';
import { MatchStatusEnum } from 'src/app/services/match/models/MatchStatusEnum';

@Component({
    selector: 'match-process',
    templateUrl: './match-process.component.html',
    styleUrls: ['./match-process.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: MatchProcessComponent,
        },
    ],
})
export class MatchProcessComponent implements ControlValueAccessor {
    form!: FormGroup;
    constructor() {
        this.form = new FormGroup({
            homeTeam: new FormControl({}),
            awayTeam: new FormControl({}),
        });
    }
    onChange = (match: Match) => { };

    onTouched = () => { };

    touched = false;

    disabled = false;

    match!: Match;

    isMatchPlayable: boolean = true;

    writeValue(match: Match): void {
        this.isMatchPlayable = match.status == MatchStatusEnum.PLAYABLE;
        console.log('isMatchPlayable', this.isMatchPlayable);
        this.match = match;
        this.form.get('homeTeam')?.setValue(match.homeTeam);
        this.form.get('awayTeam')?.setValue(match.awayTeam);
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
        if (disabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
}

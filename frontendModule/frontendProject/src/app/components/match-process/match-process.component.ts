import { Component } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatchStatusEnum } from 'src/app/components/match/models/MatchStatusEnum';
import { BetMatchModel } from '../match/models/bet-match.model';

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
    constructor () {
        this.form = new FormGroup({
            homeTeam: new FormControl({}),
            awayTeam: new FormControl({}),
        });
    }
    onChange = (match: BetMatchModel) => { };

    onTouched = () => { };

    touched = false;

    disabled = false;

    match!: BetMatchModel;

    isMatchPlayable: boolean = true;

    writeValue(match: BetMatchModel): void {
        this.isMatchPlayable = match.status == MatchStatusEnum.PLAYABLE;
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

    getColor(status: MatchStatusEnum): string {
        switch (status) {
            case MatchStatusEnum.PLAYABLE:
                case MatchStatusEnum.AWAITING_RESULT:
                return 'gray';
            case MatchStatusEnum.EXACT_WIN:
                return '#003F2B';
            case MatchStatusEnum.WON:
                return 'darkgreen';
            case MatchStatusEnum.EXPIRED:
                case MatchStatusEnum.LOST:
                return 'darkred';
            default:
                return 'transparent';
        }
    }
}

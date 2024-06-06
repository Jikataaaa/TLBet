import {
    Component,
    Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatchTeam } from 'src/app/services/match/models/MatchTeam';

@Component({
    selector: 'goals-picker',
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
    @Input()
    isHomeTeam: boolean = true;

    @Input()
    isMatchPlayable: boolean = true;

    team!: MatchTeam;

    onChange = (value: MatchTeam) => {
    };

    onTouched = () => { };

    touched = false;

    disabled = false;

    incrementGoals() {
        this.team.goals++;
        this.onChange(this.team);
        this.onTouched();
    }

    decrementGoals() {
        if (this.team.goals == 0) {
            return;
        }
        this.team.goals--;
        this.onChange(this.team);
        this.onTouched();
    }

    writeValue(team: MatchTeam) {
        this.team = team;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
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

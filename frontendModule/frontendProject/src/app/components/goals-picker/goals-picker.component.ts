import {
    Component,
    Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatchTeamModel } from '../match/models/match-team.model.ts';

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

    team!: MatchTeamModel;

    onChange = (value: MatchTeamModel) => {
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

    writeValue(team: MatchTeamModel) {
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

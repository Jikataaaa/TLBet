import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BetMatchModel } from '../models/bet-match.model';
import { MatchStatusEnum } from '../models/MatchStatusEnum';
import { CommonEventsService } from '../../../core/common/common-events.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'matches-view',
    templateUrl: './matches-view.component.html',
    styleUrls: ['./matches-view.component.scss']
})
export class MatchesViewComponent implements OnInit, OnChanges, OnDestroy {
    matchesCount!: Number;
    form!: FormGroup;
    matchesFormArray!: FormArray;
    hasPlayableMatches: boolean = false;
    subs: Subscription[] = [];

    @Input()
    isHistory: boolean = false;

    @Input()
    matches: BetMatchModel[] = [];

    @Output()
    submittedMatches: EventEmitter<BetMatchModel[]> = new EventEmitter<BetMatchModel[]>();

    constructor(private events: CommonEventsService) {
        this.matchesFormArray = new FormArray<FormGroup>([]);
        this.form = new FormGroup({
            matches: this.matchesFormArray,
        });
    }

    ngOnInit(): void {
        this.subs.push(this.events.submitPlayableMatches.subscribe(() => {
            const data: BetMatchModel[] = this.matchesFormArray.value.map((x: { match: Partial<BetMatchModel> | undefined; }) => new BetMatchModel(x.match));
            this.submittedMatches.next(data);
        }));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('matches' in changes) {
            this.fillForm(this.matches);
        }
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    fillForm(matches: BetMatchModel[]) {
        let sortedMatches: BetMatchModel[] = [];
        if (this.isHistory) {
            sortedMatches = matches.sort((a, b) => {
                if (new Date(a.startTime).getTime() >= new Date(b.startTime).getTime()) {
                    return -1;
                }

                return 0;
            });
        }
        else {
            sortedMatches = matches.sort((a, b) => {
                if (new Date(a.startTime).getTime() <= new Date(b.startTime).getTime()) {
                    return -1;
                }

                return 0;
            });
        }

        this.hasPlayableMatches = sortedMatches.some((x) => x.status == MatchStatusEnum.PLAYABLE);

        this.matchesFormArray.clear();
        const groups: FormGroup[] = sortedMatches.map(
            (match) =>
                new FormGroup({
                    match: new FormControl(match),
                })
        );
        groups.forEach((group) => this.matchesFormArray.push(group));
    }
}

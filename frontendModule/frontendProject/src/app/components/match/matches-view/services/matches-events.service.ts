import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MatchesEventsService {
    public readonly submitPlayableMatches: Subject<void> = new Subject<void>();
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonEventsService {
    public readonly submitPlayableMatches: Subject<void> = new Subject<void>();
    public readonly authChanged: Subject<void> = new Subject<void>();
}
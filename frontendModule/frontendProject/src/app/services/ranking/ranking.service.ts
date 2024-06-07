import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/shared/interfaces/Ranking';
import { BaseRequestService } from '../common/base-request.service';

@Injectable({
    providedIn: 'root'
})
export class RankingService extends BaseRequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    getGeneralRanking(): Observable<Ranking[]> {
        return this.get<Ranking[]>("ranking/general-ranking");
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { MatchStatusEnum } from 'src/app/components/match/models/MatchStatusEnum';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    transform(value: MatchStatusEnum, ...args: unknown[]): string {
        switch (value) {
            case MatchStatusEnum.EXPIRED:
                return 'Изтекъл период за залагане';
            case MatchStatusEnum.PLAYABLE:
                return 'Очакване на залог';
            case MatchStatusEnum.WON:
                return '+2 точки';
            case MatchStatusEnum.LOST:
                return 'Загубен залог';
            case MatchStatusEnum.EXACT_WIN:
                return '+5 точки';
            case MatchStatusEnum.AWAITING_RESULT:
                return 'Изчакване на резултат';
            default:
                return '';
        }
    }

}
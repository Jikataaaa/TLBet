import { Directive, EventEmitter, HostListener, Input, Output, OnInit, OnChanges, SimpleChanges, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';

@Directive()
export abstract class AbstractDebounceDirective implements OnDestroy, OnInit {

    private _debounceTime?: number;
    private _throttleTime?: number;
    protected currentTarget: EventTarget | null | undefined;

    @Input()
    public set throttleTime(value: number) {
        this._throttleTime = value;
    }

    public get throttleTime(): number {
        if (this._throttleTime == undefined) {
            this._throttleTime = AbstractDebounceDirective.globalThrottleTime;
        }

        return this._throttleTime;
    }

    @Input()
    public preventDefault: boolean = false;

    @Input()
    public stopPropagation: boolean = false;

    @Input()
    public set debounceTime(value: number) {
        this._debounceTime = value;
    }

    public get debounceTime(): number {
        if (this._debounceTime == undefined) {
            this._debounceTime = AbstractDebounceDirective.globalDebounceTime;
        }

        return this._debounceTime;
    }

    public static readonly globalThrottleTime: number = 500;
    public static readonly globalDebounceTime: number = 200;

    protected onEvent: EventEmitter<any>;

    protected emitEvent$: Subject<any>;
    protected subscription$: Subject<void>;
    protected readonly element: ElementRef;
    constructor(element: ElementRef) {
        this.element = element;
        this.onEvent = new EventEmitter<any>();
        this.emitEvent$ = new Subject<any>();
        this.subscription$ = new Subject<void>();
    }

    ngOnInit(): void {

        this.emitEvent$
            .pipe(
                debounceTime(this.debounceTime),
                map(event => this.takeTimeFromLastEmit(event)),
                takeUntil(this.subscription$),
                throttleTime(this.throttleTime),
                distinctUntilChanged(),
                tap(event => this.emitChange(event))
            )
            .subscribe();
    }

    private millisecondsTimeFromLastEmit: number = 0;
    private lastEmitTime: Date | undefined;



    private takeTimeFromLastEmit(e: Event): Event {

        if (this.lastEmitTime == undefined) {
            this.lastEmitTime = new Date();
            return e;
        } else {
            this.millisecondsTimeFromLastEmit = (new Date().getTime() - this.lastEmitTime.getTime());
            this.lastEmitTime = new Date();

            if (this.millisecondsTimeFromLastEmit < this.throttleTime) {
                e.stopPropagation();
                e.preventDefault();
                return {} as Event;
            } else {
                return e;
            }
        }


    }

    public emitChange(event: Event): void {

        if (event.type != undefined) {
            this.onEvent.emit({
                baseEvent: event,
                AT_TARGET: event.AT_TARGET,
                bubbles: event.bubbles,
                BUBBLING_PHASE: event.BUBBLING_PHASE,
                cancelable: event.cancelable,
                cancelBubble: event.cancelBubble,
                CAPTURING_PHASE: event.CAPTURING_PHASE,
                composed: event.composed,
                currentTarget: this.currentTarget,
                defaultPrevented: event.defaultPrevented,
                eventPhase: event.eventPhase,
                isTrusted: event.isTrusted,
                target: event.target,
                timeStamp: event.timeStamp,
                type: event.type,
                returnValue: event.returnValue,
                srcElement: event.srcElement,
                composedPath: event.composedPath,
                preventDefault: () => {
                    event.preventDefault();
                },
                stopImmediatePropagation: event.stopImmediatePropagation,
                stopPropagation: () => {
                    event.stopPropagation();
                },
                initEvent: (type: string, bubbles?: boolean, cancelable?: boolean) => {
                    event.initEvent(type, bubbles, cancelable);
                },
                NONE: event.NONE
            } as Event);
        }
    }

    ngOnDestroy(): void {
        this.subscription$.next();
        this.subscription$.complete();
    }
}

@Directive({
    selector: '[debouncedClick]'
})
export class DebouncedClickDirective extends AbstractDebounceDirective implements OnInit, OnDestroy {
    constructor(element: ElementRef) {
        super(element);
        this.element.nativeElement.addEventListener('click', (event: Event) => {
            this.currentTarget = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();
            this.emitEvent$.next(event);
        });
    }

    @Output()
    public get debouncedClick(): EventEmitter<any> {
        return this.onEvent;
    }

    public set debouncedClick(value: EventEmitter<any>) {
        this.onEvent = value;
    }
}
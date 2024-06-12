import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Directive, ElementRef, EmbeddedViewRef, Input, OnChanges, OnDestroy, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

export type TLTooltipPosition = 'above' | 'below' | 'before' | 'after';

const TL_TOOLTIP_POSITION_DEFAULT: TLTooltipPosition = 'above';
const TL_TOOLTIP_SHOW_DELAY_DEFAULT: number = 1000;
const TL_TOOLTIP_HIDE_DELAY_DEFAULT: number = 0;
const TL_TOOLTIP_REMOVE_DELAY_DEFAULT: number = 10000;
const TL_TOOLTIP_MARGIN_DEFAULT: number = 7;

@Directive({
    selector: '[tlTooltip]',
    exportAs: 'tlTooltip'
})
export class TLTooltipDirective implements OnChanges, OnDestroy {
    @Input('tlTooltip')
    public message: string | null = null;

    @Input('tlTooltipTemplate')
    public template: TemplateRef<unknown> | undefined;

    @Input('tlTooltipTemplateContext')
    public templateContext: unknown | undefined;

    @Input('tlTooltipPosition')
    public position: TLTooltipPosition = TL_TOOLTIP_POSITION_DEFAULT;

    @Input('tlTooltipShowDelay')
    public showDelay: number = TL_TOOLTIP_SHOW_DELAY_DEFAULT;

    @Input('tlTooltipHideDelay')
    public hideDelay: number = TL_TOOLTIP_HIDE_DELAY_DEFAULT;

    @Input('tlTooltipRemoveDelay')
    public removeDelay: number = TL_TOOLTIP_REMOVE_DELAY_DEFAULT;

    @Input('tlTooltipDisabled')
    public disabled: boolean = false;

    @Input('tlTooltipVisibleOnHover')
    public visibleOnHover: boolean = false;

    @Input('tlTooltipHideOnHover')
    public hideOnHover: boolean = false;

    @Input('tlTooltipClass')
    public tooltipClass: string | undefined;

    @Input('tlTooltipMouseMove')
    public mouseMove: boolean = false;

    @Input('tlTooltipMarginPx')
    public marginPx: number = TL_TOOLTIP_MARGIN_DEFAULT;

    public get visible(): boolean {
        return this.container?.style.visibility === 'visible';
    }

    private container: HTMLDivElement | undefined;
    private evr: EmbeddedViewRef<unknown> | undefined;

    private visibleTimeout: number | undefined;
    private hiddenTimeout: number | undefined;
    private removeTimeout: number | undefined;

    private appended: boolean = false;

    private readonly host: HTMLElement;
    private readonly overlay: HTMLElement;
    private readonly vcr: ViewContainerRef;
    private readonly cdr: ChangeDetectorRef;

    public constructor(host: ElementRef, vcr: ViewContainerRef, cdr: ChangeDetectorRef, overlay: OverlayContainer) {
        this.host = host.nativeElement as HTMLElement;
        this.overlay = overlay.getContainerElement();
        this.vcr = vcr;
        this.cdr = cdr;

        this.host.addEventListener('mouseenter', this.onMouseEnter, { passive: true });
        this.host.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const message: SimpleChange | undefined = changes['message'];
        const tooltipClass: SimpleChange | undefined = changes['tooltipClass'];
        const template: SimpleChange | undefined = changes['template'];
        const templateContext: SimpleChange | undefined = changes['templateContext'];
        const disabled: SimpleChange | undefined = changes['disabled'];

        if (message) {
            window.clearTimeout(this.visibleTimeout);
            window.clearTimeout(this.hiddenTimeout);
            window.clearTimeout(this.removeTimeout);
            this.appended = false;
            this.container?.remove();

            this.container = this.createDefaultContainer();
            this.setDefaultMessageStyles();
            this.container.innerHTML = `${this.message}`;
        }

        if (this.container && tooltipClass) {
            const prev: string[] = (tooltipClass.previousValue as string)?.split(' ').map(x => x.trim()) ?? [];
            const curr: string[] = (tooltipClass.currentValue as string)?.split(' ').map(x => x.trim()) ?? [];

            const del: string[] = prev.filter(x => !curr.includes(x));
            const add: string[] = curr.filter(x => !prev.includes(x));

            this.container.classList.remove(...del);
            this.container.classList.add(...add);
        }

        if ((template || templateContext) && this.template && !this.disabled) {
            window.clearTimeout(this.visibleTimeout);
            window.clearTimeout(this.hiddenTimeout);
            window.clearTimeout(this.removeTimeout);
            this.appended = false;
            this.container?.remove();

            this.container = this.createDefaultContainer();

            this.evr = this.vcr.createEmbeddedView(this.template, this.templateContext ?? undefined);
            for (const node of this.evr.rootNodes) {
                this.container.appendChild(node);
            }
        }

        if (disabled) {
            if (this.disabled) {
                window.clearTimeout(this.visibleTimeout);
                window.clearTimeout(this.hiddenTimeout);
                window.clearTimeout(this.removeTimeout);
                this.appended = false;
                this.container?.remove();
            }
        }
    }

    public ngOnDestroy(): void {
        this.container?.remove();

        window.clearTimeout(this.visibleTimeout);
        window.clearTimeout(this.hiddenTimeout);
        window.clearTimeout(this.removeTimeout);

        this.host.removeEventListener('mouseenter', this.onMouseEnter);
        this.host.removeEventListener('mouseleave', this.onMouseLeave);
        this.host.removeEventListener('mousemove', this.onMouseMove);

    }

    private createAndShowContainer(x: number, y: number): void {
        window.clearTimeout(this.hiddenTimeout);
        window.clearTimeout(this.removeTimeout);

        if (this.container) {
            if (!this.appended) {
                if (this.visibleOnHover) {
                    this.container.addEventListener('mouseenter', this.onContainerMouseEnter);
                    this.container.addEventListener('mouseleave', this.onContainerMouseLeave);
                }

                this.overlay.append(this.container);
                this.appended = true;

                this.cdr.detectChanges();
            }

            if(this.hideOnHover) {
                this.container.addEventListener('mouseenter', this.onContainerMouseLeave);
            }

            this.visibleTimeout = window.setTimeout(() => {
                if (this.mouseMove) {
                    this.updatePositionByMouse(x, y);
                    this.host.addEventListener('mousemove', this.onMouseMove);
                }
                else {
                    this.updatePositionByHost();
                }

                this.show();
            }, this.showDelay);
        }
    }

    private hideContainer(): void {
        window.clearTimeout(this.visibleTimeout);
        this.host.removeEventListener('mousemove', this.onMouseMove);

        this.hiddenTimeout = window.setTimeout(() => {
            this.hide();

            this.removeTimeout = window.setTimeout(() => {
                this.container?.remove();
                this.appended = false;
            }, this.removeDelay);
        }, this.hideDelay);
    }

    public onMouseEnter = (event: MouseEvent): void => {
        if (!this.disabled) {
            this.createAndShowContainer(event.clientX, event.clientY);
        }
    };

    public onMouseLeave = (event: MouseEvent): void => {
        if (!this.disabled) {
            this.hideContainer();
        }
    };

    public onMouseMove = (event: MouseEvent): void => {
        this.updatePositionByMouse(event.clientX, event.clientY);
    };

    private onContainerMouseEnter = (event: MouseEvent): void => {
        window.clearTimeout(this.hiddenTimeout);
    };

    private onContainerMouseLeave = (event: MouseEvent): void => {
        this.hideContainer();
    };

    private updatePositionByHost(): void {
        const hostRect: DOMRect = this.host.getBoundingClientRect();

        let x: number;
        let y: number;

        switch (this.position) {
            case 'above':
                x = this.capX((hostRect.left + (hostRect.width / 2)) - (this.container!.offsetWidth / 2));
                y = hostRect.top - this.container!.offsetHeight - this.marginPx;

                // fallback to 'below'
                if (y < 0) {
                    y = hostRect.top + hostRect.height + this.marginPx;
                }
                break;
            case 'below':
                x = this.capX((hostRect.left + (hostRect.width / 2)) - (this.container!.offsetWidth / 2));
                y = hostRect.top + hostRect.height + this.marginPx;

                // fallback to 'above'
                if (y + this.container!.offsetHeight > window.innerHeight) {
                    y = hostRect.top - this.container!.offsetHeight - this.marginPx;
                }
                break;
            case 'before':
                x = hostRect.left - this.container!.offsetWidth - this.marginPx;

                // fallback to 'above left'
                if (x < 0) {
                    x = this.marginPx;
                    y = hostRect.top - this.container!.offsetHeight - this.marginPx;
                }
                else {
                    y = (hostRect.top + (hostRect.height / 2)) - (this.container!.offsetHeight / 2);
                }
                break;
            case 'after':
                x = hostRect.left + hostRect.width + this.marginPx;

                // fallback to 'above right'
                if (x + this.container!.offsetWidth > window.innerWidth) {
                    x = window.innerWidth - this.container!.offsetWidth - this.marginPx;
                    y = hostRect.top - this.container!.offsetHeight - this.marginPx;
                }
                else {
                    y = (hostRect.top + (hostRect.height / 2)) - (this.container!.offsetHeight / 2);
                }
                break;
        }

        this.updatePosition(x, y);
    }

    private updatePositionByMouse(clientX: number, clientY: number): void {
        let x: number;
        let y: number;

        switch (this.position) {
            case 'above':
                x = this.capX(clientX - (this.container!.offsetWidth / 2));
                y = clientY - this.container!.offsetHeight - this.marginPx;

                // fallback to 'below'
                if (y < 0) {
                    y = clientY + this.container!.offsetHeight + this.marginPx;
                }
                break;
            case 'below':
                x = this.capX(clientX - (this.container!.offsetWidth / 2));
                y = clientY + this.container!.offsetHeight + this.marginPx;

                // fallback to 'above'
                if (y + this.container!.offsetHeight > window.innerHeight) {
                    y = clientY - this.container!.offsetHeight - this.marginPx;
                }
                break;
            case 'before':
                x = clientX - this.container!.offsetWidth - this.marginPx;

                // fallback to 'above left'
                if (x < 0) {
                    x = this.marginPx;
                    y = clientY - this.container!.offsetHeight - this.marginPx;
                }
                else {
                    y = clientY - (this.container!.offsetHeight / 2);
                }
                break;
            case 'after':
                x = clientX + this.marginPx;

                // fallback to 'above right'
                if (x + this.container!.offsetWidth > window.innerWidth) {
                    x = window.innerWidth - this.container!.offsetWidth - this.marginPx;
                    y = clientY - this.container!.offsetHeight - this.marginPx;

                }
                else {
                    y = clientY - (this.container!.offsetHeight / 2);
                }
                break;
        }

        this.updatePosition(x, y);
    }

    private updatePosition(x: number, y: number): void {
        this.container!.style.left = `${x}px`;
        this.container!.style.top = `${y}px`;
    }

    private capX(x: number): number {
        if (x < 0) {
            return this.marginPx;
        }
        else if (x + this.container!.offsetWidth > window.innerWidth) {
            return window.innerWidth - this.container!.offsetWidth - this.marginPx;
        }
        return x;
    }

    public hide(): void {
        if (this.container) {
            this.container.style.visibility = 'hidden';
            this.container.style.opacity = '0';
        }
    }

    private show(): void {
        if (this.container) {
            this.container.style.visibility = 'visible';
            this.container.style.opacity = '1';
        }
    }

    private createDefaultContainer(): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');

        container.style.pointerEvents = 'all';
        container.style.position = 'absolute';
        container.style.zIndex = '2000';
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        container.style.transition = 'opacity 300ms';
        if (this.tooltipClass && this.tooltipClass.length > 0) {
            container.classList.add(...this.tooltipClass.split(' '));
        }
        return container;
    }

    private setDefaultMessageStyles(): void {
        this.container!.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.container!.style.color = 'white';
        this.container!.style.padding = '0.5em';
        this.container!.style.borderRadius = '5px';
        this.container!.style.fontSize = '0.9em';
        this.container!.style.maxWidth = '300px';
    }
}

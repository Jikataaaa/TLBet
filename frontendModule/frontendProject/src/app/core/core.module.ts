import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { DebouncedClickDirective } from '../shared/directives/debounce-click.directive';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, AppRoutingModule, RouterModule, MaterialModule],
    exports: [HeaderComponent, FooterComponent],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }],
})
export class CoreModule { }

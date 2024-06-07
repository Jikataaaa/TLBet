import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    exports: [
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatToolbarModule,
    ],
})
export class MaterialModule { }

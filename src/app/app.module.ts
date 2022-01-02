// Module imports

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

// Component imports

import { AppComponent } from './app.component';
import { JitrListComponent } from './components/jitr-list/jitr-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddJitrComponent } from './components/add-jitr/add-jitr.component';
import { JitrDetailsComponent } from './components/jitr-details/jitr-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { DeclinedJitrListComponent } from './components/declined-jitr-list/declined-jitr-list.component';
import { RouterLinkRendererComponent } from './components/router-link-renderer/router-link-renderer.component';
import { AdminStatusListComponent } from './components/admin-status-list/admin-status-list.component';
import { AdminRatingListComponent } from './components/admin-rating-list/admin-rating-list.component';
import { JitrPositionsListComponent } from './components/jitr-positions-list/jitr-positions-list.component';
import { JitrDetailsPositionsListComponent } from './components/jitr-details-positions-list/jitr-details-positions-list.component';
import { AdminPositionListComponent } from './components/admin-position-list/admin-position-list.component';
import { UpdateJitrDialogComponent } from './components/update-jitr-dialog/update-jitr-dialog.component';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';
import { UpdatePositionDialogComponent } from './components/update-position-dialog/update-position-dialog.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

// Directive imports

import { JitrNumberValidatorDirective } from './shared/jitr-number-validator.directive';
import { NumberOfFTEValidatorDirective } from './shared/number-of-fte-validator.directive';
import { PraxisEstimatedCostValidatorDirective } from './shared/praxis-estimated-cost-validator.directive';
import { WinningPrimeEstimatedCostValidatorDirective } from './shared/winning-prime-estimated-cost-validator.directive';
import { AddJitrPositionDialogComponent } from './components/add-jitr-position-dialog/add-jitr-position-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    JitrListComponent,
    FooterComponent,
    AddJitrComponent,
    JitrDetailsComponent,
    AdminComponent,
    DeclinedJitrListComponent,
    RouterLinkRendererComponent,
    AdminStatusListComponent,
    AdminRatingListComponent,
    JitrPositionsListComponent,
    JitrDetailsPositionsListComponent,
    AdminPositionListComponent,
    UpdateJitrDialogComponent,
    IconRendererComponent,
    UpdatePositionDialogComponent,
    NotFoundPageComponent,
    JitrNumberValidatorDirective,
    NumberOfFTEValidatorDirective,
    PraxisEstimatedCostValidatorDirective,
    WinningPrimeEstimatedCostValidatorDirective,
    AddJitrPositionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([
      RouterLinkRendererComponent
    ]),
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

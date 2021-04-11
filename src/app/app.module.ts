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
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

// Component imports

import { AppComponent } from './app.component';
import { JitrListComponent } from './components/jitr-list/jitr-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddJitrComponent } from './components/add-jitr/add-jitr.component';
import { JitrDetailsComponent } from './components/jitr-details/jitr-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { DeclinedJitrListComponent } from './components/declined-jitr-list/declined-jitr-list.component';
import { RouterLinkRendererComponent } from './components/router-link-renderer/router-link-renderer.component';
import { JitrLcatsListComponent } from './components/jitr-lcats-list/jitr-lcats-list.component';
import { JitrLcatLevelsListComponent } from './components/jitr-lcat-levels-list/jitr-lcat-levels-list.component';
import { AdminStatusListComponent } from './components/admin-status-list/admin-status-list.component';
import { AdminLcatListComponent } from './components/admin-lcat-list/admin-lcat-list.component';
import { JitrDetailsLcatsListComponent } from './components/jitr-details-lcats-list/jitr-details-lcats-list.component';
import { JitrDetailsLcatLevelListComponent } from './components/jitr-details-lcat-levels-list/jitr-details-lcat-level-list.component';
import { AdminRatingListComponent } from './components/admin-rating-list/admin-rating-list.component';
import { AdminLcatLevelListComponent } from './components/admin-lcat-level-list/admin-lcat-level-list.component';

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
    JitrLcatsListComponent,
    JitrLcatLevelsListComponent,
    AdminStatusListComponent,
    AdminLcatListComponent,
    JitrDetailsLcatsListComponent,
    JitrDetailsLcatLevelListComponent,
    AdminRatingListComponent,
    AdminLcatLevelListComponent
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrRating } from 'src/app/models/jitr-rating.model';
import { JitrRatingService } from 'src/app/services/jitr-rating.service';

@Component({
  selector: 'app-admin-rating-list',
  templateUrl: './admin-rating-list.component.html',
  styleUrls: ['./admin-rating-list.component.scss']
})
export class AdminRatingListComponent implements OnInit {
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;

  jitrRating: JitrRating = new JitrRating;

  rowData: JitrRating[];

  constructor(private jitrRatingService: JitrRatingService,
    private titleService: Title) {
      this.titleService.setTitle("Admin");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'JITR Rating', field: 'ratingDescription' }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrRatingService.getJitrRatingsList().subscribe(data => {
      params.api.setRowData(data);
    })
    params.api.sizeColumnsToFit();
  }

  onSubmitJitrRating() {
    this.saveJitrStatus();
  }

  saveJitrStatus() {
    this.jitrRatingService.addJitrRating(this.jitrRating).subscribe(data => {
      console.log(data);
      alert("Successfully added JITR Rating.");
      location.reload();
    },
    error => alert("Unable to add JITR Rating."));
  }
}
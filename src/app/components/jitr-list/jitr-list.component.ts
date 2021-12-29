import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrService } from 'src/app/services/jitr.service';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

import * as moment from 'moment';

@Component({
  selector: 'app-jitr-list',
  templateUrl: './jitr-list.component.html',
  styleUrls: ['./jitr-list.component.scss']
})
export class JitrListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  jitrCount: number;
  totalJitrCount: number;
  jitrPercent: number;

  rowData: Jitr[];

  constructor(private jitrService: JitrService,
    private router: Router,
    private titleService: Title) {
      this.titleService.setTitle("JITR Home");
  }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'JITR Number', field: 'jitrNumber', sort: 'asc', sortable: true, filter: 'agNumberColumnFilter',
        cellRendererFramework: RouterLinkRendererComponent,
        cellRendererParams: {
          inRouterLink: '/jitr-details'
        }
      },
      { headerName: 'JITR Date', field: 'jitrDate', sortable: true, filter: 'agDateColumnFilter',
        cellRenderer: this.dateFormatter,
        filterParams: {
          comparator: function(filterLocalDateAtMidnight, cellValue) {
          
            let dateAsString = moment(cellValue).format('DD/MM/YYYY');
            let dateParts = dateAsString.split("/");
            let cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
      
            if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
              return 0
            }
      
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
      
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          }
        }
      },
      { headerName: 'Number Of FTE', field: 'numberOfFTE', sortable: true, filter: 'agNumberColumnFilter' },
      { headerName: 'JITR Status', field: 'jitrStatus.statusDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'JITR Rating', field: 'jitrRating.ratingDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'JITR Organization', field: 'jitrOrganization.jitrOrganizationName', sortable: true, filter: 'agTextColumnFilter' }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.jitrService.getJitrsList().subscribe(data => {
      params.api.setRowData(data);
      this.totalJitrCount = this.getRowCount();
      this.jitrPercent = this.getPercent();
    });
    params.api.sizeColumnsToFit();
  }

  onFilterChanged(event) {
    this.getRowCount();
    this.getPercent();
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
    this.getRowCount();
    this.getPercent();
  }

  clearFilters() {
    this.gridApi.setFilterModel(null);
    this.gridColumnApi.applyColumnState({
      defaultState: {
        sort: null
      },
    });
    this.gridApi.setQuickFilter(null);
    this.searchValue = '';
  }

  jitrDetails(jitrNumber: number) {
    this.router.navigate(['jitr-details', jitrNumber]);
  }

  getRowCount() {
    this.jitrCount = this.gridApi.getDisplayedRowCount();
    return this.jitrCount;
  }

  getPercent() {
    let rowCount = this.getRowCount(); 
    this.jitrPercent = Math.round((rowCount / this.totalJitrCount) * 100);
    return this.jitrPercent;
  }

  dateFormatter(params: any) {
    let dateFormat = 'MM/DD/YYYY';
    let formattedDate = moment(params.value).format(dateFormat);
    return formattedDate;
  }
}
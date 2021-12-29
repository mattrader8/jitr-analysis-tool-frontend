import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
import { JitrPositionsService } from 'src/app/services/jitr-positions.service';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'app-jitr-positions-list',
  templateUrl: './jitr-positions-list.component.html',
  styleUrls: ['./jitr-positions-list.component.scss']
})
export class JitrPositionsListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  positionCount: number;
  totalPositionCount: number;
  positionPercent: number;

  rowData: JitrPositions[]

  constructor(private jitrPositionsService: JitrPositionsService,
    private router: Router,
    private titleService: Title) {
      this.titleService.setTitle("JITR Home");
    }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'JITR Number', field: 'jitr.jitrNumber', sort: 'asc', sortable: true, filter: 'agNumberColumnFilter',
        cellRendererFramework: RouterLinkRendererComponent,
          cellRendererParams: {
            inRouterLink: '/jitr-details'
          }
      },
      { headerName: 'Labor Category', field: 'position.lcatDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'Labor Category Level', field: 'position.lcatLevelDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'JITR Status', field: 'jitr.jitrStatus.statusDescription', sortable: true, filter: 'agTextColumnFilter' }
    ]
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.jitrPositionsService.getJitrPositionsList().subscribe(data => {
      params.api.setRowData(data);
      this.totalPositionCount = this.getRowCount();
      this.positionPercent = this.getPercent();
    })
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
    })
    this.gridApi.setQuickFilter(null);
    this.searchValue = '';
  }

  jitrDetails(jitrNumber: number) {
    this.router.navigate(['jitr-details', jitrNumber]);
  }
  
  getRowCount() {
    this.positionCount = this.gridApi.getDisplayedRowCount();
    return this.positionCount;
  }

  getPercent() {
    let rowCount = this.getRowCount(); 
    this.positionPercent = Math.round((rowCount / this.totalPositionCount) * 100);
    return this.positionPercent;
  }
}
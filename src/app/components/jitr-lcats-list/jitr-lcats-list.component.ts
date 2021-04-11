import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrLcats } from 'src/app/models/jitr-lcats.model';
import { JitrLcatsService } from 'src/app/services/jitr-lcats.service';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'app-jitr-lcats-list',
  templateUrl: './jitr-lcats-list.component.html',
  styleUrls: ['./jitr-lcats-list.component.scss']
})
export class JitrLcatsListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  lcatCount: number;
  totalLcatCount: number;
  lcatPercent: number;

  rowData: JitrLcats[]

  constructor(private jitrLcatsService: JitrLcatsService,
    private router: Router,
    private titleService: Title) {
      this.titleService.setTitle("JITR Home");
    }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'JITR Number', field: 'jitr.jitrNumber', sortable: true, filter: 'agNumberColumnFilter',
        cellRendererFramework: RouterLinkRendererComponent,
          cellRendererParams: {
            inRouterLink: '/jitr-details'
          }
      },
      { headerName: 'Labor Category', field: 'lcat.lcatDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'JITR Status', field: 'jitr.jitrStatus.statusDescription', sortable: true, filter: 'agTextColumnFilter' }
    ]
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrLcatsService.getJitrLcatsList().subscribe(data => {
      params.api.setRowData(data);
      this.totalLcatCount = this.getRowCount();
      this.lcatPercent = this.getPercent();
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
    this.gridApi.setSortModel(null);
    this.gridApi.setQuickFilter(null);
    this.searchValue = '';
  }

  jitrDetails(jitrNumber: number) {
    this.router.navigate(['jitr-details', jitrNumber]);
  }
  
  getRowCount() {
    this.lcatCount = this.gridApi.getDisplayedRowCount();
    return this.lcatCount;
  }

  getPercent() {
    let rowCount = this.getRowCount(); 
    this.lcatPercent = Math.round((rowCount / this.totalLcatCount) * 100);
    return this.lcatPercent;
  }
}
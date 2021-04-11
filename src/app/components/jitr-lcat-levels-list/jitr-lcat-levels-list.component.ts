import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrLcatLevels } from 'src/app/models/jitr-lcat-levels.model';
import { JitrLcatLevelsService } from 'src/app/services/jitr-lcat-levels.service';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'app-jitr-lcat-levels-list',
  templateUrl: './jitr-lcat-levels-list.component.html',
  styleUrls: ['./jitr-lcat-levels-list.component.scss']
})
export class JitrLcatLevelsListComponent implements OnInit {
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  lcatLevelCount: number;
  totalLcatLevelCount: number;
  lcatLevelPercent: number;

  rowData: JitrLcatLevels[]

  constructor(private jitrLcatLevelsService: JitrLcatLevelsService,
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
      { headerName: 'Labor Category Level', field: 'lcatLevel.lcatLevelDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'JITR Status', field: 'jitr.jitrStatus.statusDescription', sortable: true, filter: 'agTextColumnFilter' }
    ]
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrLcatLevelsService.getJitrLcatLevelsList().subscribe(data => {
      params.api.setRowData(data);
      this.totalLcatLevelCount = this.getRowCount();
      this.lcatLevelPercent = this.getPercent();
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
    this.lcatLevelCount = this.gridApi.getDisplayedRowCount();
    return this.lcatLevelCount;
  }

  getPercent() {
    let rowCount = this.getRowCount(); 
    this.lcatLevelPercent = Math.round((rowCount / this.totalLcatLevelCount) * 100);
    return this.lcatLevelPercent;
  }
}
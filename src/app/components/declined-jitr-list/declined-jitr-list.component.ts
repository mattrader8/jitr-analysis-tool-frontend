import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrService } from 'src/app/services/jitr.service';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'app-declined-jitr-list',
  templateUrl: './declined-jitr-list.component.html',
  styleUrls: ['./declined-jitr-list.component.scss']
})
export class DeclinedJitrListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  jitrCount: number;
  totalJitrCount: number;
  jitrPercent: number;

  averageCostDifference: number;

  costDifference: number;

  rowData: Jitr[];

  constructor(private jitrService: JitrService,
    private router: Router,
    private titleService: Title) {
      this.titleService.setTitle("JITR Home");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'JITR Number', field: 'jitrNumber', sort: 'asc', sortable: true, filter: 'agNumberColumnFilter',
        cellRendererFramework: RouterLinkRendererComponent,
          cellRendererParams: {
            inRouterLink: '/jitr-details'
          }
      },
      { headerName: 'Number Of FTE', field: 'numberOfFTE', sortable: true, filter: 'agNumberColumnFilter' },
      { headerName: 'Praxis Est. Cost', field: 'praxisEstimatedCost', sortable: true, filter: 'agNumberColumnFilter',
        cellRenderer: this.currencyCellRendererUSD
      },
      { headerName: 'Winning Prime Est. Cost', field: 'winningPrimeEstimatedCost', sortable: true, filter: 'agNumberColumnFilter',
        cellRenderer: this.currencyCellRendererUSD
      },
      { headerName: 'Cost Difference', sortable: true, filter: 'agNumberColumnFilter',
        valueGetter: params => {
          this.costDifference = params.data.praxisEstimatedCost - params.data.winningPrimeEstimatedCost;
          return this.costDifference;
        },
        cellRenderer: this.currencyCellRendererUSD
      },
      { headerName: 'Cost Difference %', sortable: true, filter: 'agNumberColumnFilter',
        valueGetter: params => {
          return ( (params.data.praxisEstimatedCost - params.data.winningPrimeEstimatedCost) / params.data.winningPrimeEstimatedCost) * 100;
        },
        cellRenderer: this.costDifferenceFormatter
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.jitrService.getDeclinedJitrs().subscribe(data => {
      params.api.setRowData(data);
      this.totalJitrCount = this.getRowCount();
      this.jitrPercent = this.getPercent();
    })
    params.api.sizeColumnsToFit();
    this.getAverageCostDifference();
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

  getAverageCostDifference() {
    this.jitrService.getAverageCostDifference().subscribe((data) => this.averageCostDifference = data);
    return this.averageCostDifference;
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

  currencyCellRendererUSD(params: any) {
    let costFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    return costFormat.format(params.value);
  }

  costDifferenceFormatter(params: any) {
    return Math.round( (params.value) * 100) / 100 + '%';
  }
}
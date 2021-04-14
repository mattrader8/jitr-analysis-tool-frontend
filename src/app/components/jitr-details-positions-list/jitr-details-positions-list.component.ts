import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrPositionsService } from 'src/app/services/jitr-positions.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-jitr-details-positions-list',
  templateUrl: './jitr-details-positions-list.component.html',
  styleUrls: ['./jitr-details-positions-list.component.scss']
})
export class JitrDetailsPositionsListComponent implements OnInit {

  @Input() jitr: Jitr;
  @Input() jitrNumber: number;
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  positionCount: number;
  totalPositionCount: number;
  positionPercent: number;

  maxID: number;

  jitrPosition: JitrPositions = new JitrPositions;

  lcat: string;
  lcats: string[];

  lcatLevel: string;
  lcatLevels: string[];

  rowData: JitrPositions[];

  constructor(private jitrPositionsService: JitrPositionsService,
    private positionService: PositionService,
    private titleService: Title) {
      this.titleService.setTitle("JITR Details");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Description', field: 'position.lcatDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'LCAT Level Description', field: 'position.lcatLevelDescription', sortable: true, filter: 'agTextColumnFilter' },
    ];
    this.getLcats();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrPositionsService.getJitrPositionsByJitrNumber(this.jitrNumber).subscribe(data => {
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
    this.gridApi.setSortModel(null);
    this.gridApi.setQuickFilter(null);
    this.searchValue = '';
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

  getLcats() {
    this.positionService.getDistinctLCATList().subscribe(data => {
      this.lcats = data;
      console.log(this.lcats);
    })
  }

  onLcatChange(newLcat) {
    this.lcatLevels = null;
    this.lcat = newLcat
    this.getLcatLevels();
  }

  getLcatLevels() {
    this.positionService.getLCATLevelListByLCATDescription(this.lcat).subscribe(data => {
      this.lcatLevels = data;
      console.log(this.lcatLevels);
    })
  }

  onSubmitPosition() {
    this.saveJitrPositions();
  }

  saveJitrPositions() {
    // to do
    // 1) create UUID
    // 2) construct object {UUID, lcat, level}
    /*this.getID();
    this.jitrLcat = {"jitrLCATID": this.maxID, "jitr": this.jitr, "lcat": this.lcat};
    this.jitrLcatsService.addJitrLcats(this.jitrLcat).subscribe(data => {
      console.log(data);
      alert("Successfully added LCAT.");
      location.reload();
    },
    error => alert("Unable to add LCAT."));*/
  }

  getUUID() { // work around - need to eventually bind JitrLcat data and send to back-end like "add-jitr" component
    // to do
    // generate new uuid
  }
}
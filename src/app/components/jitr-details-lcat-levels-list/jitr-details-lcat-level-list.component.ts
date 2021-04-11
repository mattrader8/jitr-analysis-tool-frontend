import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrLcatLevels } from 'src/app/models/jitr-lcat-levels.model';
import { Jitr } from 'src/app/models/jitr.model';
import { LcatLevel } from 'src/app/models/lcat-level.model';
import { JitrLcatLevelsService } from 'src/app/services/jitr-lcat-levels.service';
import { LcatLevelService } from 'src/app/services/lcat-level.service';

@Component({
  selector: 'app-jitr-details-lcat-level-list',
  templateUrl: './jitr-details-lcat-level-list.component.html',
  styleUrls: ['./jitr-details-lcat-level-list.component.scss']
})
export class JitrDetailsLcatLevelListComponent implements OnInit {
  @Input() jitr: Jitr;
  @Input() jitrNumber: number;
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  lcatLevelCount: number;
  totalLcatLevelCount: number;
  lcatLevelPercent: number;

  maxID: number;

  lcatLevels: LcatLevel[];
  lcatLevel: LcatLevel = new LcatLevel;

  jitrLcatLevel: JitrLcatLevels = new JitrLcatLevels;

  rowData: JitrLcatLevels[];

  constructor(private jitrLcatLevelsService: JitrLcatLevelsService,
    private lcatLevelService: LcatLevelService,
    private titleService: Title) {
      this.titleService.setTitle("JITR Details");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Level Description', field: 'lcatLevel.lcatLevelDescription', sortable: true, filter: 'agTextColumnFilter' }
    ];
    this.getLcatLevels();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrLcatLevelsService.getJitrLcatLevelsByJitrNumber(this.jitrNumber).subscribe(data => {
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

  getRowCount() {
    this.lcatLevelCount = this.gridApi.getDisplayedRowCount();
    return this.lcatLevelCount;
  }

  getPercent() {
    let rowCount = this.getRowCount(); 
    this.lcatLevelPercent = Math.round((rowCount / this.totalLcatLevelCount) * 100);
    return this.lcatLevelPercent;
  }

  getLcatLevels() {
    this.lcatLevelService.getLcatLevelList().subscribe(data => {
      this.lcatLevels = data;
      console.log(this.lcatLevels);
    })
  }

  onSubmitLcatLevel() {
    this.saveJitrLcatLevels();
  }

  saveJitrLcatLevels() {
    this.getID();
    this.jitrLcatLevel = {"jitrLCATLevelID": this.maxID, "jitr": this.jitr, "lcatLevel": this.lcatLevel};
    this.jitrLcatLevelsService.addJitrLcatLevels(this.jitrLcatLevel).subscribe(data => {
      console.log(data);
      alert("Successfully added LCAT Level.");
      location.reload();
    },
    error => alert("Unable to add LCAT Level."));
  }

  getID() { // work around - need to eventually bind JitrLcat data and send to back-end like "add-jitr" component
    this.jitrLcatLevelsService.getMaxJitrLcatLevelID().subscribe(data => {
      this.maxID = data;
      return this.maxID + 1;
    });
  }
}
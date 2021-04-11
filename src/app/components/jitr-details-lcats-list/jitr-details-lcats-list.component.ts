import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrLcats } from 'src/app/models/jitr-lcats.model';
import { Jitr } from 'src/app/models/jitr.model';
import { Lcat } from 'src/app/models/lcat.model';
import { JitrLcatsService } from 'src/app/services/jitr-lcats.service';
import { LcatService } from 'src/app/services/lcat.service';

@Component({
  selector: 'app-jitr-details-lcats-list',
  templateUrl: './jitr-details-lcats-list.component.html',
  styleUrls: ['./jitr-details-lcats-list.component.scss']
})
export class JitrDetailsLcatsListComponent implements OnInit {

  @Input() jitr: Jitr;
  @Input() jitrNumber: number;
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  lcatCount: number;
  totalLcatCount: number;
  lcatPercent: number;

  maxID: number;

  jitrLcat: JitrLcats = new JitrLcats;

  lcat: Lcat = new Lcat;
  lcats: Lcat[];

  rowData: JitrLcats[];

  constructor(private jitrLcatsService: JitrLcatsService,
    private lcatService: LcatService,
    private titleService: Title) {
      this.titleService.setTitle("JITR Details");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Description', field: 'lcat.lcatDescription', sortable: true, filter: 'agTextColumnFilter' }
    ];
    this.getLcats();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrLcatsService.getJitrLcatsByJitrNumber(this.jitrNumber).subscribe(data => {
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

  getRowCount() {
    this.lcatCount = this.gridApi.getDisplayedRowCount();
    return this.lcatCount;
  }

  getPercent() {
    let rowCount = this.getRowCount(); 
    this.lcatPercent = Math.round((rowCount / this.totalLcatCount) * 100);
    return this.lcatPercent;
  }

  getLcats() {
    this.lcatService.getLcatList().subscribe(data => {
      this.lcats = data;
      console.log(this.lcats);
    })
  }

  onSubmitLcat() {
    this.saveJitrLcats();
  }

  saveJitrLcats() {
    this.getID();
    this.jitrLcat = {"jitrLCATID": this.maxID, "jitr": this.jitr, "lcat": this.lcat};
    this.jitrLcatsService.addJitrLcats(this.jitrLcat).subscribe(data => {
      console.log(data);
      alert("Successfully added LCAT.");
      location.reload();
    },
    error => alert("Unable to add LCAT."));
  }

  getID() { // work around - need to eventually bind JitrLcat data and send to back-end like "add-jitr" component
    this.jitrLcatsService.getMaxJitrLcatID().subscribe(data => {
      this.maxID = data;
      return this.maxID + 1;
    });
  }
}
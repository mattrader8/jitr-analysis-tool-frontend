import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { LcatLevel } from 'src/app/models/lcat-level.model';
import { LcatLevelService } from 'src/app/services/lcat-level.service';

@Component({
  selector: 'app-admin-lcat-level-list',
  templateUrl: './admin-lcat-level-list.component.html',
  styleUrls: ['./admin-lcat-level-list.component.scss']
})
export class AdminLcatLevelListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;

  lcatLevel: LcatLevel = new LcatLevel;

  rowData: LcatLevel[];

  constructor(private lcatLevelService: LcatLevelService,
    private titleService: Title) {
      this.titleService.setTitle("Admin");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Level Description', field: 'lcatLevelDescription'}
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.lcatLevelService.getLcatLevelList().subscribe(data => {
      params.api.setRowData(data);
    })
    params.api.sizeColumnsToFit();
  }

  onSubmitLcatLevel() {
    this.saveLcatLevel();
  }

  saveLcatLevel() {
    this.lcatLevelService.addLcatLevel(this.lcatLevel).subscribe(data => {
      console.log(data);
      alert("Successfully added LCAT Level.");
      location.reload();
    },
    error => alert("Unable to add LCAT Level."));
  }
}
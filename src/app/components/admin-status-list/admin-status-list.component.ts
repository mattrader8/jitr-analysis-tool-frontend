import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { JitrStatus } from 'src/app/models/jitr-status.model';
import { JitrStatusService } from 'src/app/services/jitr-status.service';

@Component({
  selector: 'app-admin-status-list',
  templateUrl: './admin-status-list.component.html',
  styleUrls: ['./admin-status-list.component.scss']
})
export class AdminStatusListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;

  jitrStatus: JitrStatus = new JitrStatus;

  rowData: JitrStatus[];

  constructor(private jitrStatusService: JitrStatusService,
    private titleService: Title) {
      this.titleService.setTitle("Admin");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'JITR Status', field: 'statusDescription' }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.jitrStatusService.getJitrStatusesList().subscribe(data => {
      params.api.setRowData(data);
    })
    params.api.sizeColumnsToFit();
  }

  onSubmitJitrStatus() {
    this.saveJitrStatus();
  }

  saveJitrStatus() {
    this.jitrStatusService.addJitrStatus(this.jitrStatus).subscribe(data => {
      console.log(data);
      alert("Successfully added JITR Status.");
      location.reload();
    },
    error => alert("Unable to add JITR Status."));
  }
}
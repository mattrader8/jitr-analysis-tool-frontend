import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { Lcat } from 'src/app/models/lcat.model';
import { LcatService } from 'src/app/services/lcat.service';

@Component({
  selector: 'app-admin-lcat-list',
  templateUrl: './admin-lcat-list.component.html',
  styleUrls: ['./admin-lcat-list.component.scss']
})
export class AdminLcatListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;

  lcat: Lcat = new Lcat;

  rowData: Lcat[];

  constructor(private lcatService: LcatService,
    private titleService: Title) {
      this.titleService.setTitle("Admin");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Description', field: 'lcatDescription', filter: 'agTextColumnFilter'}
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.lcatService.getLcatList().subscribe(data => {
      params.api.setRowData(data);
    })
    params.api.sizeColumnsToFit();
  }

  onSubmitLcat() {
    this.saveLcat();
  }

  saveLcat() {
    this.lcatService.addLcat(this.lcat).subscribe(data => {
      console.log(data);
      alert("Successfully added LCAT.");
      location.reload();
    },
    error => alert("Unable to add LCAT."));
  }
}
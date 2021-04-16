import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-admin-position-list',
  templateUrl: './admin-position-list.component.html',
  styleUrls: ['./admin-position-list.component.scss']
})
export class AdminPositionListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;

  position: Position = new Position;

  rowData: Position[];

  constructor(private positionService: PositionService,
    private titleService: Title) {
      this.titleService.setTitle("Admin");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Description', field: 'lcatDescription' },
      { headerName: 'LCAT Level Description', field: 'lcatLevelDescription' }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.positionService.getPositionList().subscribe(data => {
      params.api.setRowData(data);
    })
    params.api.sizeColumnsToFit();
  }

  onSubmitPosition() {
    this.savePosition();
  }

  savePosition() {
    this.positionService.addPosition(this.position).subscribe(data => {
      console.log(data);
      alert("Successfully added Position.");
      location.reload();
    },
    error => alert("Unable to add Position."));
  }
}
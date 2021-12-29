import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent } from 'ag-grid-community';
import { UUID } from 'angular2-uuid';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
import { Jitr } from 'src/app/models/jitr.model';
import { Position } from 'src/app/models/position.model';
import { JitrPositionsService } from 'src/app/services/jitr-positions.service';
import { PositionService } from 'src/app/services/position.service';
import { IconRendererComponent } from '../icon-renderer/icon-renderer.component';

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

  positionID: number;
  jitrPositionID: string;

  position: Position = new Position;

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
      { headerName: 'LCAT Description', field: 'position.lcatDescription', sort: 'asc', sortable: true, filter: 'agTextColumnFilter'},
      { headerName: 'LCAT Level Description', field: 'position.lcatLevelDescription', sortable: true, filter: 'agTextColumnFilter' },
      { headerName: 'Actions', 
        cellRendererFramework:  IconRendererComponent,
        cellRendererParams: {
          positionToUpdate: {
            onCellClicked: (event: CellClickedEvent) => event.data,
          }
        }
      }
    ];
    this.getLcats();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
    this.gridColumnApi.applyColumnState({
      defaultState: {
        sort: null
      },
    });
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
    if (this.jitr.jitrStatus.statusDescription == 'No-Bid') {
      this.lcatLevels = ['Not Applicable'];
    } else if (this.jitr.jitrStatus.statusDescription == 'Cancelled') {
      this.positionService.getLCATLevelListByLCATDescriptionForCancelledJITRs(this.lcat).subscribe(data => {
        this.lcatLevels = data;
        console.log(this.lcatLevels);
      })
    } else {
      this.positionService.getLCATLevelListByLCATDescriptionForActiveJITRs(this.lcat).subscribe(data => {
        this.lcatLevels = data;
        console.log(this.lcatLevels);
      })
    }
  }

  onSubmitPosition() {
    if (this.positionCount >= this.jitr.numberOfFTE) {
        if(this.jitr.numberOfFTE == 1) {
          alert("Unable to add JITR Position. There is only " + this.jitr.numberOfFTE + " position for this JITR.");
        } else {
          alert("Unable to add JITR Position. There are only " + this.jitr.numberOfFTE + " positions for this JITR.");
        }
    } else if (this.lcat == null || this.lcatLevel == null) {
      alert("Unable to add JITR Position. Please select an LCAT and Level.");
    }
    else {
      this.saveJitrPositions();
    }
  }

  saveJitrPositions() {
    // service call to retrieve positionID from Position table
    this.positionService.getPositionIDByLCATAndLCATLevelDescriptions(this.lcat, this.lcatLevel).subscribe(data => {
      this.positionID = data;

      // constructs the Position object
      this.position = {"positionID": this.positionID, "lcatDescription": this.lcat, "lcatLevelDescription": this.lcatLevel}

      // constructs the JITR Position object
      this.jitrPosition = {"jitrPositionID": this.generateUUID(), "jitr": this.jitr, "position": this.position};

      // service call to add JITR Position object to JITR Positions table
      this.jitrPositionsService.addJitrPositions(this.jitrPosition).subscribe(data => {
        console.log(data);
        alert("Successfully added JITR Position.");
        location.reload();
      },
      error => alert("Unable to add JITR Position."));
    });
  }

  generateUUID() {
    this.jitrPositionID = UUID.UUID();
    return this.jitrPositionID;
  }
}
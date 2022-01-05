import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { UUID } from 'angular2-uuid';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
import { Jitr } from 'src/app/models/jitr.model';
import { Position } from 'src/app/models/position.model';
import { JitrPositionsService } from 'src/app/services/jitr-positions.service';
import { PositionService } from 'src/app/services/position.service';
import { AddJitrPositionDialogComponent } from '../add-jitr-position-dialog/add-jitr-position-dialog.component';
import { UpdatePositionDialogComponent } from '../update-position-dialog/update-position-dialog.component';

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

  isMaxFTE: boolean;

  isSelected: boolean;

  rowData: JitrPositions[];

  constructor(private jitrPositionsService: JitrPositionsService,
    private positionService: PositionService,
    private dialog: MatDialog,
    private titleService: Title) {
      this.titleService.setTitle("JITR Details");
  }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'LCAT Description', field: 'position.lcatDescription', checkboxSelection: true, sort: 'asc', sortable: true, filter: 'agTextColumnFilter'},
      { headerName: 'LCAT Level Description', field: 'position.lcatLevelDescription', sortable: true, filter: 'agTextColumnFilter' },
    ];
    this.getLcats();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.jitrPositionsService.getJitrPositionsByJitrNumber(this.jitrNumber).subscribe(data => {
      params.api.setRowData(data);
      this.totalPositionCount = this.getRowCount();
      this.getPercent();
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
    this.gridColumnApi.resetColumnState();
    this.gridApi.setQuickFilter(null);
    this.searchValue = '';
  }

  onRowSelected(event) {
    if (event.node.selected)
    {
      this.jitrPosition = event.node.data;
      console.log(this.jitrPosition);
    }
    return this.isSelected = true;
  }

  onSelectionChanged(event) {
    if (event.api.getSelectedNodes() == 0)
    {
      this.isSelected = false;
    }
    return this.isSelected;
  }

  getRowCount() {
    this.positionCount = this.gridApi.getDisplayedRowCount();
    return this.positionCount;
  }

  getPercent() {
    let rowCount = this.getRowCount();
    if (rowCount == 0) {
      this.positionPercent = 0;
    } else {
      this.positionPercent = Math.round((rowCount / this.totalPositionCount) * 100);
    }
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

  deletePosition() {
    if(confirm("Are you sure you want to delete this JITR Position?")) {
      this.jitrPositionsService.deleteJitrPositions(this.jitrPosition.jitrPositionID).subscribe(data => {
        console.log(data);
        alert("Successfully deleted JITR Position.");
        location.reload();
      },
      error => alert("Unable to delete JITR Position."));
    }
  }

  generateUUID() {
    this.jitrPositionID = UUID.UUID();
    return this.jitrPositionID;
  }

  openAddJITRPositionDialog() {
    let addJitrPositionDialog = this.dialog.open(AddJitrPositionDialogComponent, {
      data: {
        jitr: this.jitr,
        positionCount: this.positionCount,
      },
    });
    addJitrPositionDialog.afterClosed().subscribe(result => {
      location.reload();
    })
  }

  openUpdatePositionDialog() {
    this.dialog.open(UpdatePositionDialogComponent, {
      data: {
        jitrPosition: this.jitrPosition,
      },
    });
    console.log(this.jitrPosition);
  }
}
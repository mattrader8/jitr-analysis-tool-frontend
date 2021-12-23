import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
import { Position } from 'src/app/models/position.model';
import { JitrPositionsService } from 'src/app/services/jitr-positions.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-update-position-dialog',
  template: 'passed in {{ data.jitrPosition }}',
  templateUrl: './update-position-dialog.component.html',
  styleUrls: ['./update-position-dialog.component.scss']
})
export class UpdatePositionDialogComponent implements OnInit {

  lcat: string;
  lcats: string[];

  lcatLevel: string;
  lcatLevels: string[];

  selectedLcat: string;
  selectedLcatLevel: string;

  positionID: number;

  position: Position = new Position;

  jitrPosition = this.data.jitrPosition;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {jitrPosition: JitrPositions, },
    private positionService: PositionService,
    private jitrPositionsService: JitrPositionsService) { }

  ngOnInit(): void {
    this.getLcats();
    this.getSelectedLcatLevel();

    this.selectedLcat = this.jitrPosition.position.lcatDescription;
    this.selectedLcatLevel = this.jitrPosition.position.lcatLevelDescription;
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

  getSelectedLcatLevel() {
    if (this.jitrPosition.jitr.jitrStatus.statusDescription == 'No-Bid') {
      this.lcatLevels = ['Not Applicable'];
    } else if (this.jitrPosition.jitr.jitrStatus.statusDescription == 'Cancelled') {
      this.positionService.getLCATLevelListByLCATDescriptionForCancelledJITRs(this.jitrPosition.position.lcatDescription).subscribe(data => {
        this.lcatLevels = data;
        console.log(this.lcatLevels);
      })
    } else {
      this.positionService.getLCATLevelListByLCATDescriptionForActiveJITRs(this.jitrPosition.position.lcatDescription).subscribe(data => {
        this.lcatLevels = data;
        console.log(this.lcatLevels);
      })
    }
  }

  getLcatLevels() {
    if (this.jitrPosition.jitr.jitrStatus.statusDescription == 'No-Bid') {
      this.lcatLevels = ['Not Applicable'];
    } else if (this.jitrPosition.jitr.jitrStatus.statusDescription == 'Cancelled') {
      this.positionService.getLCATLevelListByLCATDescriptionForCancelledJITRs(this.jitrPosition.position.lcatDescription).subscribe(data => {
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

  updateJitrPosition() {
    if(confirm("Are you sure you want to update this JITR Position?")) {
      // service call to retrieve positionID from Position table
      this.positionService.getPositionIDByLCATAndLCATLevelDescriptions(this.selectedLcat, this.selectedLcatLevel).subscribe(data => {
        this.positionID = data;

        // constructs the Position object
        this.position = {"positionID": this.positionID, "lcatDescription": this.selectedLcat, "lcatLevelDescription": this.selectedLcatLevel};

        // constructs the JITR Position object
        this.jitrPosition = {"jitrPositionID": this.jitrPosition.jitrPositionID, "jitr": this.jitrPosition.jitr, "position": this.position};

        // service call to update JITR Position object to JITR Positions table
        this.jitrPositionsService.updateJitrPositions(this.jitrPosition.jitrPositionID, this.jitrPosition).subscribe(data => {
          console.log(data);
          alert("Successfully updated JITR Position.");
          location.reload();
        },
        error => alert("Unable to update JITR Position."));
      });
    }
  }

  cancelUpdate() {
    if(confirm("Are you sure you want to cancel? Changes to Position Details will not be saved.")) {
      location.reload();
    }
  }
}

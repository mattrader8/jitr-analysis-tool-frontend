import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
import { Jitr } from 'src/app/models/jitr.model';
import { Position } from 'src/app/models/position.model';
import { JitrPositionsService } from 'src/app/services/jitr-positions.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-add-jitr-position-dialog',
  templateUrl: './add-jitr-position-dialog.component.html',
  styleUrls: ['./add-jitr-position-dialog.component.scss']
})
export class AddJitrPositionDialogComponent implements OnInit {

  jitr = this.data.jitr;

  positionID: number;
  jitrPositionID: string;

  position: Position = new Position;

  jitrPosition: JitrPositions = new JitrPositions;

  positionCount = this.data.positionCount;

  lcat: string;
  lcats: string[];

  lcatLevel: string;
  lcatLevels: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {jitr: Jitr, positionCount: number},
    private jitrPositionsService: JitrPositionsService,
    private positionService: PositionService) { }

  ngOnInit(): void {
    this.getLcats();
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

  onCancel() {
    if(confirm("Are you sure you want to cancel?")) {
      location.reload();
    }
  }
}
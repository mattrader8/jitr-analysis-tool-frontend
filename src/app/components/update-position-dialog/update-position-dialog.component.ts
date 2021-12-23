import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JitrPositions } from 'src/app/models/jitr-positions.model';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {jitrPosition: JitrPositions, },
    private positionService: PositionService,) { }

  ngOnInit(): void {
    this.getLcats();

    // tests to make sure data was passed correctly
    console.log(this.data.jitrPosition.jitr.jitrStatus.statusDescription);
    console.log(this.data.jitrPosition.position.lcatDescription);
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
    this.positionService.getLCATLevelListByLCATDescriptionForActiveJITRs(this.lcat).subscribe(data => {
      this.lcatLevels = data;
      console.log(this.lcatLevels);
    })
  }

  cancelUpdate() {
    if(confirm("Are you sure you want to cancel? Changes to Position Details will not be saved.")) {
      location.reload();
    }
  }
}

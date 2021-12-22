import { Component, OnInit } from '@angular/core';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-update-position-dialog',
  templateUrl: './update-position-dialog.component.html',
  styleUrls: ['./update-position-dialog.component.scss']
})
export class UpdatePositionDialogComponent implements OnInit {

  lcat: string;
  lcats: string[];

  lcatLevel: string;
  lcatLevels: string[];

  constructor(private positionService: PositionService,) { }

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

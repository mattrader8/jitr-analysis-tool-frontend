import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JitrOrganization } from 'src/app/models/jitr-organization.model';
import { JitrRating } from 'src/app/models/jitr-rating.model';
import { JitrStatus } from 'src/app/models/jitr-status.model';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrOrganizationService } from 'src/app/services/jitr-organization.service';
import { JitrRatingService } from 'src/app/services/jitr-rating.service';
import { JitrStatusService } from 'src/app/services/jitr-status.service';
import { JitrService } from 'src/app/services/jitr.service';

@Component({
  selector: 'app-update-jitr-dialog',
  template: 'passed in {{ data.jitr }}',
  templateUrl: './update-jitr-dialog.component.html',
  styleUrls: ['./update-jitr-dialog.component.scss']
})
export class UpdateJitrDialogComponent implements OnInit {

  jitrStatuses: JitrStatus[];
  jitrRatings: JitrRating[];
  jitrOrganizations: JitrOrganization[];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {jitr: Jitr, },
    private jitrStatusService: JitrStatusService,
    private jitrRatingService: JitrRatingService,
    private jitrOrganizationService: JitrOrganizationService,
    private jitrService: JitrService) { }

  ngOnInit(): void {
    this.getJitrStatuses();
    this.getJitrRatings();
    this.getJitrOrganizations();
  }

  updateJitr() {
    if(confirm("Are you sure you want to update this JITR?")) {
      this.jitrService.updateJitr(this.data.jitr.jitrNumber, this.data.jitr).subscribe(data => {
        console.log(data);
        alert("Successfully updated JITR.");
        location.reload();
      },
      error => alert("Unable to update JITR."));
    }
  }

  getJitrStatuses() {
    this.jitrStatusService.getJitrStatusesList().subscribe(data => {
      this.jitrStatuses = data;
      console.log(this.jitrStatuses);
      console.log(this.data.jitr.jitrStatus);
    })
  }

  getJitrRatings() {
    this.jitrRatingService.getJitrRatingsList().subscribe(data => {
      this.jitrRatings = data;
      console.log(this.jitrRatings);
    })
  }

  getJitrOrganizations() {
    this.jitrOrganizationService.getJitrOrganizationsList().subscribe(data => {
      this.jitrOrganizations = data;
      console.log(this.jitrOrganizations);
    })
  }

  cancelUpdate() {
    if(confirm("Are you sure you want to cancel? Changes to JITR Details will not be saved.")) {
      location.reload();
    }
  }
}

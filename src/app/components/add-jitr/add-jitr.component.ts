import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { JitrOrganization } from 'src/app/models/jitr-organization.model';
import { JitrRating } from 'src/app/models/jitr-rating.model';
import { JitrStatus } from 'src/app/models/jitr-status.model';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrOrganizationService } from 'src/app/services/jitr-organization.service';
import { JitrRatingService } from 'src/app/services/jitr-rating.service';
import { JitrStatusService } from 'src/app/services/jitr-status.service';
import { JitrService } from 'src/app/services/jitr.service';

@Component({
  selector: 'app-add-jitr',
  templateUrl: './add-jitr.component.html',
  styleUrls: ['./add-jitr.component.scss']
})
export class AddJitrComponent implements OnInit {

  jitr: Jitr = new Jitr;
  jitrStatuses: JitrStatus[];
  jitrRatings: JitrRating[];
  jitrOrganizations: JitrOrganization[];
  
  constructor(private jitrService: JitrService,
    private jitrStatusService: JitrStatusService,
    private jitrRatingService: JitrRatingService,
    private jitrOrganizationService: JitrOrganizationService,
    private titleService: Title) {
      this.titleService.setTitle("Add JITR");
  }

  ngOnInit(): void {
    this.getJitrStatuses();
    this.getJitrRatings();
    this.getJitrOrganizations();
  }

  saveJitr() {
    this.jitrService.addJitr(this.jitr).subscribe(data => {
      console.log(data);
      alert("Successfully added JITR.");
    },
    error => alert("Unable to add JITR."));
  }

  onSubmit() {
    this.saveJitr();
  }

  onCancel(form: NgForm) {
    form.reset();
  }

  getJitrStatuses() {
    this.jitrStatusService.getJitrStatusesList().subscribe(data => {
      this.jitrStatuses = data;
      console.log(this.jitrStatuses);
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
}
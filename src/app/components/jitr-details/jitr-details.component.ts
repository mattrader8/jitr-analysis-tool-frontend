import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrService } from 'src/app/services/jitr.service';
import { UpdateJitrDialogComponent } from '../update-jitr-dialog/update-jitr-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-jitr-details',
  templateUrl: './jitr-details.component.html',
  styleUrls: ['./jitr-details.component.scss']
})
export class JitrDetailsComponent implements OnInit {
  
  jitrNumber: number;
  jitr: Jitr = new Jitr;

  jitrDate: Date;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private jitrService: JitrService,
    private titleService: Title) {
      this.titleService.setTitle("JITR Details");
    }

  ngOnInit(): void {
    this.jitrNumber = this.route.snapshot.params['jitrNumber'];

    this.displayJitrInfo();
  }

  displayJitrInfo() {
    this.jitrService.getJitrByNumber(this.jitrNumber).subscribe(data => {
      this.jitr = data;
    });
  }

  returnToJITRList() {
    this.router.navigate(['jitrs']);
  }

  openUpdateDialog() {
    let updateJitrDialog = this.dialog.open(UpdateJitrDialogComponent, {
      data: {
        jitr: this.jitr,
      },
    });
    updateJitrDialog.afterClosed().subscribe(result => {
      location.reload();
    })
  }

  deleteJitr() {
    if(confirm("Are you sure you want to delete this JITR?")) {
      this.jitrService.deleteJitr(this.jitrNumber).subscribe(data => {
        console.log(data);
        alert("Successfully deleted JITR.");
        this.router.navigate(['jitrs']);
      },
      error => alert("Unable to delete JITR."));
    }
  }
}
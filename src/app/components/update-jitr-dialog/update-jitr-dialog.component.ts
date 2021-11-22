import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Jitr } from 'src/app/models/jitr.model';

@Component({
  selector: 'app-update-jitr-dialog',
  template: 'passed in {{ data.jitr }}',
  templateUrl: './update-jitr-dialog.component.html',
  styleUrls: ['./update-jitr-dialog.component.scss']
})
export class UpdateJitrDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {jitr: Jitr}) { }

  ngOnInit(): void {
  }

}

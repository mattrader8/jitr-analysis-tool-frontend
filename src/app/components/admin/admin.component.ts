import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JitrRating } from 'src/app/models/jitr-rating.model';
import { JitrStatus } from 'src/app/models/jitr-status.model';
import { JitrRatingService } from 'src/app/services/jitr-rating.service';
import { JitrStatusService } from 'src/app/services/jitr-status.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private titleService: Title) {
      this.titleService.setTitle("Admin");
  }

  ngOnInit(): void {
  }
}
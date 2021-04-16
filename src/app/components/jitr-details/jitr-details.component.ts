import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Jitr } from 'src/app/models/jitr.model';
import { JitrService } from 'src/app/services/jitr.service';

@Component({
  selector: 'app-jitr-details',
  templateUrl: './jitr-details.component.html',
  styleUrls: ['./jitr-details.component.scss']
})
export class JitrDetailsComponent implements OnInit {
  
  jitrNumber: number;
  jitr: Jitr = new Jitr;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
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
}
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private router: Router,
    private titleService: Title) { 
      this.titleService.setTitle("404 Error");
    }

  ngOnInit(): void {
  }

  returnToJITRHomePage() {
    this.router.navigate(['jitrs']);
  }
}

import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-router-link-renderer',
  templateUrl: './router-link-renderer.component.html',
  styleUrls: ['./router-link-renderer.component.scss']
})
export class RouterLinkRendererComponent implements AgRendererComponent {

  params: any;

  constructor(
      private ngZone: NgZone,
      private router: Router) { }

  agInit(params: any): void {
      this.params = params;
  }

  refresh(params: any): boolean {
      return false;
  }

  navigate(link) {
      this.ngZone.run(() => {
          this.router.navigate([link, this.params.value]);
      });
  }
}
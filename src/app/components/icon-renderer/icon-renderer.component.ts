import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgRendererComponent } from 'ag-grid-angular';
import { UpdatePositionDialogComponent } from '../update-position-dialog/update-position-dialog.component';

@Component({
  selector: 'app-icon-renderer',
  templateUrl: './icon-renderer.component.html',
  styleUrls: ['./icon-renderer.component.scss']
})
export class IconRendererComponent implements AgRendererComponent {

  params: any;

  constructor(private dialog: MatDialog) {}

  agInit(params: any): void {
      this.params = params;
  }

  refresh(params: any): boolean {
      return false;
  }

  openUpdatePositionDialog() {
    let updatePositionDialog = this.dialog.open(UpdatePositionDialogComponent, {
      data: {
        jitrPosition: this.params.data,
      },
    });
    updatePositionDialog.afterClosed().subscribe(result => {
      location.reload();
    })
    console.log(this.params.data);
  }

}
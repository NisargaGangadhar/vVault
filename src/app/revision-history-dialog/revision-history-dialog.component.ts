import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-revision-history-dialog',
  template: `
    <h1 mat-dialog-title>Revision History for selected file</h1>
    <div mat-dialog-content>
      <ul>
        <li *ngFor="let comment of data.comments">{{ comment }}</li>
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: [`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 5px 0;
    }
  `]
})
export class RevisionHistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { filename: string; comments: string[] }) {}
}

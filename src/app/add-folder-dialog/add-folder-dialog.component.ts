import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-folder-dialog',
  templateUrl: './add-folder-dialog.component.html',
  styleUrls: ['./add-folder-dialog.component.css']
})
export class AddFolderDialogComponent {
  folderName: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(); // Close the dialog without doing anything
  }

  onAddClick(): void {
    this.dialogRef.close(this.folderName); // Send the folder name back
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from '../folder.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddFolderDialogComponent } from '../add-folder-dialog/add-folder-dialog.component';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
   constructor(private router: Router, private folderService: FolderService, private http: HttpClient, public dialog: MatDialog) {}
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  folders: string[] = []; 
  selectedFile:any="";
  files: any[]=[]; 
  folderName:string = "";
  isBlack: boolean = false;
  selectedFolder: string =""; // Track the clicked folder
  

  turnBlack(folder: string): void {
    this.files=[]; 
    this.selectedFolder = folder;
    console.log("selected folder>>", this.selectedFolder);
    this.fetchFiles(folder); // Fetch files for the selected folder
  }
   
  ngOnInit() {
    this.fetchFolders();
  }

  fetchFolders() {
    this.folderService.getFolders("Policy").subscribe({
      next: (data) => {
        this.folders = data; // Assign the "folders" array directly
      },
      error: (err) => {
        console.error('Error fetching folders:', err);
      },
    });

  }

  openAddFolderDialog(): void {
    const dialogRef = this.dialog.open(AddFolderDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((folderName) => {
      if (folderName) {
        this.addFolder(folderName);
      }
    });
  }

  addFolder(folderName: string): void {
    this.folderService.addFolder(folderName, "Policy/" ).subscribe({
      next: () => {
        console.log('Folder added successfully');
        this.fetchFolders(); // Refresh the list after adding
      },
      error: (error) => {
        console.error('Error adding folder:', error);
      }
    });
  }

  fetchFiles(folder: string): void {
    this.folderService.getFiles(folder, 'Policy/').subscribe({
      next: (response) => {
        console.log('Files:', response.Files);
  
        // Extract filenames into a flat list
        this.files = response.Files.map((file) => file.filename);
  
        console.log('Extracted Filenames:', this.files); // Log the list of filenames
      },
      error: (error) => {
        console.error('Error fetching files:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected File:', this.selectedFile);
    }
  }

  // Upload file to API
  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
  
    this.folderService.uploadFile(this.selectedFile, this.selectedFolder).subscribe({
      next: (response) => {
        console.log('File uploaded successfully', response);
        this.selectedFile='';
        alert('File uploaded successfully');
        
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      }
    });
  
  
  }
}

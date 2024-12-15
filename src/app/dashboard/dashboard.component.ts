import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   folders: string[] = ["Policy", "Formats", "Manual","Procedures","SOP"]; 
   isBlack: boolean = false;
   selectedFolder: string | null = null; // Track the clicked folder
   

   turnBlack(folder: string): void {
     this.selectedFolder = folder;
   }



    userData: any = {
    "password":"Admin",
    "email":"Admin@vvault.com",
    "folder_path": "Policy/Internal"
  };


   constructor(private folderService: FolderService, private http: HttpClient) {}
   
   ngOnInit() {
     this.fetchFolders();
   }
 
   fetchFolders() {
    //  this.folderService.getFolders().subscribe({
    //    next: (data) => {
    //      this.folders = data; // Assign the "folders" array directly
    //    },
    //    error: (err) => {
    //      console.error('Error fetching folders:', err);
    //    },
    //  });

    this.http.request('GET','/vault/list_folders', {body:this.userData}).subscribe(data => {
      console.log('response: ', data);
    });
   }

  

}

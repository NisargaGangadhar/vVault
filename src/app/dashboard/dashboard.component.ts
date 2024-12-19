import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
   folders: string[] = ["Policy", "Formats", "Manual","Procedures","SOP"]; 
   isBlack: boolean = false;
   selectedFolder: string | null = null; // Track the clicked folder
   

   turnBlack(folder: string): void {
     this.selectedFolder = folder;
   }


}

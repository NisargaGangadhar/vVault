import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
   constructor(private router: Router) {}
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  folders: string[] = ["HR", "Quality"]; 
  isBlack: boolean = false;
  selectedFolder: string | null = null; // Track the clicked folder
  

  turnBlack(folder: string): void {
    this.selectedFolder = folder;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderService {


  private apiUrl = '/vault/list_folders'; // Replace with your API endpoint
  private createFolder = '/vault/create_folder';
  private listFiles = '/vault/list_files';
  private upload='/vault/upload_file';

  constructor(private http: HttpClient) {}

  getFolders(folder_path:string):  Observable<string[]> {
    const payload={
      "password":"Admin",
      "email":"Admin@vvault.com",
      "folder_path":folder_path
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Create a custom GET request with a body
    const req = new HttpRequest('POST', this.apiUrl, payload, { headers });

    return this.http.request<{ folders: string[] }>(req).pipe(
      // Extract the response body
      map((event: any) => {
        if (event.type === HttpEventType.Response) {
          return event.body.folders; // Extract the folders array from the response body
        }
        return [];
      })
    );
  }

  addFolder(folder_name: string, folder_path: string): Observable<any> {
    const payload = {
      password: "Admin",
      email: "Admin@vvault.com",
      folder_path: folder_path + folder_name,
    };
  
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
  
    // Use HttpClient.post to send the request without extracting the response
    return this.http.post(this.createFolder, payload, { headers });
  }

  getFiles(folder: string, path: string): Observable<{ Files: any[]; message: string }> {
    const payload = {
      password: 'Admin',
      email: 'Admin@vvault.com',
      folder_path: path + folder
    };
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<{ Files: any[]; message: string }>(
      this.listFiles,
      payload,
      { headers }
    );
  }

  uploadFile(file: File, folder:string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', 'Admin@vvault.com');
    formData.append('password', 'Admin');
    formData.append('folder','Policy/'+folder);
    formData.append('version_comment', 'Testing Version 7');

    const headers = new HttpHeaders();

    return this.http.post(this.upload, formData, { headers });
  }
  }
  
  

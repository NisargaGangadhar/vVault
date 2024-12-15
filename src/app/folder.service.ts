import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private apiUrl = '/vault/list_folders'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getFolders():  Observable<string[]> {
    const body = { someKey: 'someValue' }; // Replace with the actual body content
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Create a custom GET request with a body
    const req = new HttpRequest('GET', this.apiUrl, body, { headers });

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
}
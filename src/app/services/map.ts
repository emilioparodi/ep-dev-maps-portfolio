import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://cartes.io/api/maps';

  private readonly MY_MAP_ID = '2f59c9d9-a215-4f11-9ee8-f8f787755e60';

  public publicMaps = rxResource({
    stream: () => this.http.get<any>(this.API_URL).pipe(
      map(response => {
        const allMaps = Array.isArray(response) ? response : response.data || [];

        return allMaps.filter((m: any) => m.uuid === this.MY_MAP_ID);
      })
    )
  });

  createMap(title: string) {
    const body = { title, privacy: 'public' };
    return this.http.post<any>(this.API_URL, body);
  }

  constructor() {}
}

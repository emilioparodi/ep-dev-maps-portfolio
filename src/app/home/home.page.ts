import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { MapService } from '../services/map';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, IonLabel, IonItem, IonList, IonSpinner, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  // Inject Map service to access the publicSignal
  public mapService = inject(MapService);
  private router = inject(Router);

  constructor() {
    // Register the icon to use it
    addIcons({addOutline});
  }

  createNewMap() {
    const brandName = "ƎP Dev Portfolio";
    const randomId = Math.floor(Math.random() * 100);
    const myTitle = `${brandName} - Project #${randomId}`;

    this.mapService.createMap(myTitle).subscribe({
      next: (newMap) => {
        console.log('New portfolio map created:', newMap);
        this.mapService.publicMaps.reload();
      },
      error: (err) => console.error('Error creating:', err)
    })
  }

  goToDetail(mapUuid: string) {
    this.router.navigate(['/map-detail', mapUuid]);
  }

}

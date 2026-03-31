import { Component, OnInit, inject, input, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.page.html',
  styleUrls: ['./map-detail.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton]
})
export class MapDetailPage implements OnInit, AfterViewInit, OnDestroy {

  public id = input<string>();
  private map: L.Map | undefined;

  private clients = [
    { name: 'Retire now, live rich', website: 'https://www.retirenowliverich.com', coords: [4.545266, -75.662373] as [number, number] },
    { name: 'Harley Rescue', website: 'https://www.harley-rescue.web.app', coords: [4.6161046, -75.635595] as [number, number] },
    { name: 'Marea Rimini Spiagge', website: 'https://www.mareaspiagge.it', coords: [44.048946, 12.602241] as [number, number] },
    { name: 'Altura Realty', website: 'https://www.alturarealty.org', coords: [4.562296, -75.654411] as [number, number] },
    { name: 'Big Bang', website: 'https://www.alturarealty.org', coords: [43.9494699, 12.4060812] as [number, number] },
    { name: 'Linkfood Srl', website: 'https://www.linkfood-store.com', coords: [43.977992, 12.4733959] as [number, number] },
    { name: "Art'Energetica", website: 'https://www.artenergetica.org', coords: [43.9690476, 12.4768075] as [number, number] },
    { name: 'DataTrade', website: 'https://www.store.datatrade.sm', coords: [43.9762873, 12.4837007] as [number, number] },
    { name: 'Graphic Studio Design', website: 'https://www.graphicstudiodesign.it', coords: [43.9514219, 12.4030935] as [number, number] },
    { name: 'Daniela Moroni Fotografie', website: 'https://www.danielamoroni.com', coords: [43.9272181, 12.4952931] as [number, number] },
    { name: 'SH Health Service', website: 'https://www.sh.sm', coords: [43.9875581, 12.5009711] as [number, number] },
    { name: 'Bitsani', website: 'https://www.bitsani.com', coords: [43.990161, 12.515138] as [number, number] },
  ];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initMap();

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        this.autoFitMarkers(); // Forza l'inquadratura dopo il caricamento
      }
    }, 600);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  private initMap(): void {
    const container = L.DomUtil.get('map');
    if (container) { (container as any)._leaflet_id = null; }

    // Partiamo con una vista globale, poi l'autoFit aggiusterà tutto
    this.map = L.map('map').setView([20.0, -30.0], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© CARTO',
      maxZoom: 20
    }).addTo(this.map);

    // --- HQ MARKER ---
    const armeniaCoords: [number, number] = [4.5339, -75.6811];
    L.circleMarker(armeniaCoords, {
      radius: 12, fillColor: "#222529", color: "#FFD700", weight: 3, fillOpacity: 1
    }).addTo(this.map).bindPopup('<b>ƎP Dev Headquarter</b><br>Armenia, Colombia');

    // --- CLIENT MARKERS ---
    this.clients.forEach(client => {
      L.circleMarker(client.coords, {
        radius: 8, fillColor: "#4A90E2", color: "white", weight: 2, fillOpacity: 0.8
      }).addTo(this.map!).bindPopup(`<b>${client.name}</b><br><a href="${client.website}" target="_blank">View Website →</a>`);
    });
  }

  private autoFitMarkers(): void {
    if (!this.map) return;

    // Raccogliamo tutte le coordinate
    const points: L.LatLngExpression[] = [
      [4.5339, -75.6811], // HQ
      ...this.clients.map(c => c.coords)
    ];

    const bounds = L.latLngBounds(points);

    // Su mobile (schermo < 768px) aumentiamo il padding per evitare che i marker tocchino i bordi
    const isMobile = window.innerWidth < 768;
    const paddingValue = isMobile ? 20 : 50;

    this.map.fitBounds(bounds, {
      padding: [paddingValue, paddingValue],
      maxZoom: 12
    });
  }
}

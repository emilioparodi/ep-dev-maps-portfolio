import { Component, OnInit, inject, input, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.page.html',
  styleUrls: ['./map-detail.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton]
})
export class MapDetailPage implements OnInit, AfterViewInit, OnDestroy {

  // Retrive ID
  public id = input<string>();
  private map: L.Map | undefined;

  // Customers list
  private clients = [
    {
      name: 'Harley Rescue',
      website: 'https://www.harley-rescue.web.app',
      coords: [4.6161046, -75.635595] as [number, number]
    },
    {
      name: 'Marea Rimini Spiagge',
      website: 'https://www.mareaspiagge.it',
      coords: [44.048946, 12.602241] as [number, number]
    },
    {
      name: 'Altura Realty',
      website: 'https://www.alturarealty.org',
      coords: [4.562296, -75.654411] as [number, number]
    },
    {
      name: 'Big Bang',
      website: 'https://www.alturarealty.org',
      coords: [43.9494699, 12.4060812] as [number, number]
    },
    {
      name: 'Linkfood Srl',
      website: 'https://www.linkfood-store.com',
      coords: [43.977992, 12.4733959] as [number, number]
    },
    {
      name: "Art'Energetica",
      website: 'https://www.artenergetica.org',
      coords: [43.9690476, 12.4768075] as [number, number]
    },
    {
      name: 'DataTrade',
      website: 'https://www.store.datatrade.sm',
      coords: [43.9762873, 12.4837007] as [number, number]
    },
    {
      name: 'Graphic Studio Design',
      website: 'https://www.graphicstudiodesign.it',
      coords: [43.9514219, 12.4030935] as [number, number]
    },
    {
      name: 'Daniela Moroni Fotografie',
      website: 'https://www.danielamoroni.com',
      coords: [43.9272181, 12.4952931] as [number, number]
    },
    {
      name: 'SH Health Service',
      website: 'https://www.sh.sm',
      coords: [43.9875581, 12.5009711] as [number, number]
    },
    {
      name: 'Bitsani',
      website: 'https://www.bitsani.com',
      coords: [43.990161, 12.515138] as [number, number]
    },
  ];

  constructor() { }

  ngOnInit() {
    console.log('Portfolio ID:', this.id());
  }

  ngAfterViewInit() {
    this.initMap();

    // Waiting ionic graphic imports
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 500);
  }

  ngOnDestroy() {
    // Reset Map container
    if (this.map) {
      this.map.remove();
      this.map = undefined;
      console.log('Cleanup ƎP Dev complete.');
    }
  }

  private initMap(): void {
    // Reset HTML container
    const container = L.DomUtil.get('map');
    if (container) {
      (container as any)._leaflet_id = null;
    }

    this.map = L.map('map').setView([25.0, -35.0], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    // --- ƎP DEV HEADQUARTERS (ARMENIA) ---
    const armeniaCoords: [number, number] = [4.5339, -75.6811];
    L.circleMarker(armeniaCoords, {
      radius: 14,
      fillColor: "#222529",
      color: "#FFD700",
      weight: 3,
      opacity: 1,
      fillOpacity: 1
    }).addTo(this.map)
      .bindPopup(`
        <div style="text-align: center; font-family: sans-serif;">
          <strong style="font-size: 1.1em;">ƎP Dev </strong>Headquarter<br>
          <span>Armenia, Quindío</span>
          <br/>
          <a href="https://emilioparodi.dev" target="_blank" rel="noopener noreferrer"
               style="color: #4A90E2; text-decoration: none; font-weight: bold; font-size: 0.9em;">
               View Website →
            </a>
        </div>
      `);

    // --- CUSTOMER MARKERS ---
    this.clients.forEach(client => {
      L.circleMarker(client.coords, {
        radius: 9,
        fillColor: "#4A90E2",
        color: "white",
        weight: 2,
        fillOpacity: 0.8
      }).addTo(this.map!)
        .bindPopup(`
          <div style="text-align: center; font-family: sans-serif;">
            <b style="color: #222529;">${client.name}</b><br>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 5px 0;">
            <a href="${client.website}" target="_blank" rel="noopener noreferrer"
               style="color: #4A90E2; text-decoration: none; font-weight: bold; font-size: 0.9em;">
               View Website →
            </a>
          </div>
        `);
    });
  }
}

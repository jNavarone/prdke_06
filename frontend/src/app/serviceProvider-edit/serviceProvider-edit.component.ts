import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GeocodeService } from '../geocode-service/geocode.service';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ServiceProvider {
  id: number;
  companyName: string;
  emailAddress: string;
  startPoint: string;
  startPointLatitude?: number;
  startPointLongitude?: number;
}

@Component({
  selector: 'app-serviceProvider-edit',
  templateUrl: './serviceProvider-edit.component.html',
  styleUrls: ['./serviceProvider-edit.component.scss']
})
export class ServiceProviderEditComponent implements OnInit, AfterViewInit {
  serviceProvider: ServiceProvider = {
    id: 0,
    companyName: '',
    emailAddress: '',
    startPoint: '',
  };

  private map: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private geocodeService: GeocodeService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const serviceProviderId = +id;
      this.serviceProvider = await firstValueFrom(this.http.get<ServiceProvider>(`http://localhost:8080/providers/${serviceProviderId}`));
      console.log("Fetched serviceProvider data:", this.serviceProvider);
      if (this.serviceProvider.startPointLatitude && this.serviceProvider.startPointLongitude) {
        this.initMap();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.serviceProvider.startPointLatitude && this.serviceProvider.startPointLongitude) {
      this.initMap();
    }
  }

  private initMap(): void {
    if (!this.serviceProvider.startPointLatitude || !this.serviceProvider.startPointLongitude) {
      console.error("Start point coordinates are missing.");
      return;
    }

    this.map = L.map('map').setView([this.serviceProvider.startPointLatitude, this.serviceProvider.startPointLongitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'assets/map_pointer_icon.png',
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40]
    });

    L.marker([this.serviceProvider.startPointLatitude, this.serviceProvider.startPointLongitude], { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Startpunkt Adresse')
      .openPopup();
  }

  async saveServiceProvider(): Promise<void> {
    try {

      // Fetch new coordinates for the start points
      const startPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.serviceProvider.startPoint));

      // Update the persons object new coordinates
      this.serviceProvider.startPointLatitude = startPointCoords.latitude;
      this.serviceProvider.startPointLongitude = startPointCoords.longitude;

      if (this.serviceProvider.id) {
        await firstValueFrom(this.http.put(`http://localhost:8080/providers/${this.serviceProvider.id}`, this.serviceProvider));
        alert('Transportdienstleister erfolgreich aktualisiert!');
        this.router.navigate(['/listServiceProviders']);
      }
    } catch (error) {
      console.error('Failed to update service provider', error);
    }
  }

  async deleteServiceProvider(): Promise<void> {
    const confirmed = confirm('Sind Sie sicher das sie den Transportdienstleister löschen möchten?');
    if (confirmed && this.serviceProvider.id) {
      try {
        await firstValueFrom(this.http.delete(`http://localhost:8080/providers/${this.serviceProvider.id}`));
        alert('Transportdienstleister erfolgreich gelöscht!');
        this.router.navigate(['/serviceProviders']);
      } catch (error) {
        console.error('There was an error deleting the service provider', error);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/listServiceProviders']);
  }
}

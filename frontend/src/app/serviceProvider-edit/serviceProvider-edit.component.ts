import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GeocodeService } from '../geocode-service/geocode.service';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ServiceProvider {
  id: number;
  companyName: string;
  eMailAddress: string;
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
    eMailAddress: '',
    startPoint: '',
  };

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
      this.serviceProvider = await firstValueFrom(this.http.get<ServiceProvider>(`http://localhost:8080/serviceProviders/${serviceProviderId}`));
      console.log("Fetched serviceProvider data:", this.serviceProvider);
      this.initMap();
    }
  }
  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
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

    //if (this.serviceProvider.endPointLatitude && this.serviceProvider.endPointLongitude) {
      this.drawRoute();
    //}
  }

  private drawRoute(): void {
    if (!this.serviceProvider.startPointLatitude || !this.serviceProvider.startPointLongitude) {
      console.error('Start coordinates are missing');
      return;
    }

    const apiKey = '5b3ce3597851110001cf6248c1bc8ce508ea4d3e94b1128c7c3478be'; // Use your actual OpenRouteService API key
    const start = `${this.serviceProvider.startPointLongitude},${this.serviceProvider.startPointLatitude}`;
    //const end = `${this.person.endPointLongitude},${this.person.endPointLatitude}`;
    const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}`;

    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        // Extracting coordinates from the response
        const coordinates = response.features[0].geometry.coordinates;
        // Convert coordinates to the format Leaflet expects ([lat, lng])
        const latLngs = coordinates.map((coord: [number, number]) => L.latLng(coord[1], coord[0]));
        // Draw the polyline on the map
        const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(this.map);
        // Adjust the map view to fit the route
        this.map.fitBounds(polyline.getBounds());

        // Define the custom icon
        const customIcon = L.icon({
          iconUrl: 'assets/map_pointer_icon.png', // Path to the icon image in your project's assets folder
          iconSize: [30, 40], // Size of the icon
          iconAnchor: [15, 20], // Point of the icon which will correspond to marker's location
          popupAnchor: [0, -20] // Point from which the popup should open relative to the iconAnchor
        });

        // Add markers with the custom icon for the start and end points
        const startPoint = latLngs[0];
        //const endPoint = latLngs[latLngs.length - 1];

        L.marker(startPoint, { icon: customIcon }).addTo(this.map)
          .bindPopup('Startpunkt Adresse')

        //L.marker(endPoint, { icon: customIcon }).addTo(this.map)
        //  .bindPopup('Endpunkt Adresse')
      },
      error: (error) => console.error('Error fetching route:', error) // Debug
    });
  }

  async saveRoute(): Promise<void> {
    try {
      // Assuming startPoint and endPoint inputs are addresses needing geocoding
      const startPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.serviceProvider.startPoint));
      //const endPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.person.endPoint));

      // Update the routeDetails object with new coordinates
      this.serviceProvider.startPointLatitude = startPointCoords.latitude;
      this.serviceProvider.startPointLongitude = startPointCoords.longitude;
      //this.serviceProvider.endPointLatitude = endPointCoords.latitude;
      //this.serviceProvider.endPointLongitude = endPointCoords.longitude;

      // Prepare the data for PUT request
      const updatedRouteDetails = {
        ...this.serviceProvider,
        startPointLatitude: startPointCoords.latitude,
        startPointLongitude: startPointCoords.longitude,
        //endPointLatitude: endPointCoords.latitude,
        //endPointLongitude: endPointCoords.longitude
      };

      // Send a PUT request to update the route
      await firstValueFrom(this.http.put(`http://localhost:8080/routes/${this.serviceProvider.id}`, updatedRouteDetails));

      // Optionally, if the backend doesn't automatically update the vehicle based on route changes,
      // you might need to send a separate update request for the vehicle.
      // This is hypothetical and depends on your backend implementation.

      alert('Route updated successfully!');
      this.router.navigate(['/listRoute']); // Adjust the navigation route as necessary
    } catch (error) {
      console.error('Failed to update route', error);
    }
  }

  async saveServiceProvider(): Promise<void> {
    // Assuming you have a service to fetch coordinates, else skip this part
    try {
      // Proceed to update the person as before
      if (this.serviceProvider.id) {
        await firstValueFrom(this.http.put(`http://localhost:8080/providers/${this.serviceProvider.id}`, this.serviceProvider));
        alert('Transportdienstleister erfolgreich aktualisiert!');
        this.router.navigate(['/listServiceProviders']); // Adjust the route as necessary
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

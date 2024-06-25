import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GeocodeService } from '../geocode-service/geocode.service';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  wheelchairUser: boolean;
  startPoint: string;
  endPoint: string;
  startPointLatitude?: number;
  startPointLongitude?: number;
  endPointLatitude?: number;
  endPointLongitude?: number;
}

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit, AfterViewInit {
  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    wheelchairUser: false,
    startPoint: '',
    endPoint: ''
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
      const personId = +id;
      this.person = await firstValueFrom(this.http.get<Person>(`http://localhost:8080/people/${personId}`));
      console.log("Fetched person data:", this.person);
      this.initMap();
    }
  }
  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (!this.person.startPointLatitude || !this.person.startPointLongitude) {
      console.error("Start point coordinates are missing.");
      return;
    }

    this.map = L.map('map').setView([this.person.startPointLatitude, this.person.startPointLongitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.person.endPointLatitude && this.person.endPointLongitude) {
      this.drawRoute();
    }
  }

  private drawRoute(): void {
    if (!this.person.startPointLatitude || !this.person.startPointLongitude || !this.person.endPointLatitude || !this.person.endPointLongitude) {
      console.error('Start or end coordinates are missing');
      return;
    }

    const apiKey = '5b3ce3597851110001cf6248c1bc8ce508ea4d3e94b1128c7c3478be'; // Use your actual OpenRouteService API key
    const start = `${this.person.startPointLongitude},${this.person.startPointLatitude}`;
    const end = `${this.person.endPointLongitude},${this.person.endPointLatitude}`;
    const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;

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
        const endPoint = latLngs[latLngs.length - 1];

        L.marker(startPoint, { icon: customIcon }).addTo(this.map)
          .bindPopup('Startpunkt Adresse')

        L.marker(endPoint, { icon: customIcon }).addTo(this.map)
          .bindPopup('Endpunkt Adresse')
      },
      error: (error) => console.error('Error fetching route:', error) // Debug
    });
  }

  async saveRoute(): Promise<void> {
    try {
      // Assuming startPoint and endPoint inputs are addresses needing geocoding
      const startPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.person.startPoint));
      const endPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.person.endPoint));

      // Update the routeDetails object with new coordinates
      this.person.startPointLatitude = startPointCoords.latitude;
      this.person.startPointLongitude = startPointCoords.longitude;
      this.person.endPointLatitude = endPointCoords.latitude;
      this.person.endPointLongitude = endPointCoords.longitude;

      // Prepare the data for PUT request
      const updatedRouteDetails = {
        ...this.person,
        startPointLatitude: startPointCoords.latitude,
        startPointLongitude: startPointCoords.longitude,
        endPointLatitude: endPointCoords.latitude,
        endPointLongitude: endPointCoords.longitude
      };

      // Send a PUT request to update the route
      await firstValueFrom(this.http.put(`http://localhost:8080/routes/${this.person.id}`, updatedRouteDetails));

      // Optionally, if the backend doesn't automatically update the vehicle based on route changes,
      // you might need to send a separate update request for the vehicle.
      // This is hypothetical and depends on your backend implementation.

      alert('Route updated successfully!');
      this.router.navigate(['/listRoute']); // Adjust the navigation route as necessary
    } catch (error) {
      console.error('Failed to update route', error);
    }
  }

  async savePerson(): Promise<void> {
    // Assuming you have a service to fetch coordinates, else skip this part
    try {

      // Fetch new coordinates for the start and end points
      const startPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.person.startPoint));
      const endPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.person.endPoint));

      // Update the persons object new coordinates
      this.person.startPointLatitude = startPointCoords.latitude;
      this.person.startPointLongitude = startPointCoords.longitude;
      this.person.endPointLatitude = endPointCoords.latitude;
      this.person.endPointLongitude = endPointCoords.longitude;

      // Proceed to update the person as before
      if (this.person.id) {
        await firstValueFrom(this.http.put(`http://localhost:8080/people/${this.person.id}`, this.person));
        alert('Person erfolgreich aktualisiert!');
        this.router.navigate(['/listPeople']); // Adjust the route as necessary
      }
    } catch (error) {
      console.error('Failed to update person', error);
    }
  }

  async deletePerson(): Promise<void> {
    const confirmed = confirm('Sind Sie sicher das sie die Person löschen möchten?');
    if (confirmed && this.person.id) {
      try {
        await firstValueFrom(this.http.delete(`http://localhost:8080/people/${this.person.id}`));
        alert('Person erfolgreich gelöscht!');
        this.router.navigate(['/people']);
      } catch (error) {
        console.error('There was an error deleting the person', error);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/listPerson']);
  }
}

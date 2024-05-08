import {AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeocodeService } from '../geocode-service/geocode.service'; // Ensure this path matches your project structure
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';


interface Person {
  id?: any;
  firstName: any;
  lastName: any;
  gender: any;
  wheelchairUser: any;
  startPoint: any;
  endPoint: any;
  startPointLatitude?: any;
  startPointLongitude?: any;
  endPointLatitude?: any;
  endPointLongitude?: any;
}

@Component({
  selector: 'app-person-form',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit, AfterViewInit {
  people: Person[] = [];
  selectedPerson: Person | null = null;

  routeDetails: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    wheelchairUser: '',
    startPoint: '',
    endPoint: '',
  };

  private map: any;

  // Form fields
  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  wheelchairUser: boolean = false;
  startPoint: string = '';
  endPoint: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private geocodeService: GeocodeService
  ) {}

  loadPeople(): void {
    this.http.get<Person[]>('http://localhost:8080/people/').subscribe({
      next: (data) => this.people = data,
      error: (error) => console.error(error)
    });
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.gender = person.gender;
    this.wheelchairUser = person.wheelchairUser;
    this.startPoint= person.startPoint;
    this.endPoint = person.endPoint;
  }

  async savePerson(): Promise<void> {
    console.log('saveVehicle called'); // Check if method is triggered
    try {
      console.log('Attempting to fetch coordinates'); // Check if execution reaches here
      const startPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.startPoint));
      console.log('Start Point Coordinates:', startPointCoords); // Log fetched coordinates
      const endPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.endPoint));
      console.log('End Point Coordinates:', endPointCoords); // Log fetched coordinates
      const person: Person = {
        id: this.selectedPerson?.id,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        wheelchairUser: this.wheelchairUser,
        startPoint: this.startPoint,
        endPoint: this.endPoint,
        startPointLatitude: startPointCoords.latitude, // Set latitude
        startPointLongitude: startPointCoords.longitude, // Set longitude
        endPointLatitude: endPointCoords.latitude, // Set latitude
        endPointLongitude: endPointCoords.longitude, // Set longitude
      };

      if (person.id) {
        this.http.put(`http://localhost:8080/vehicles/${person.id}`, person, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).subscribe({
          next: () => {
            alert('Person updated successfully!');
            this.resetForm();
          },
          error: (error) => console.error(error)
        });
      } else {
        this.http.post('http://localhost:8080/vehicles/', person, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).subscribe({
          next: () => {
            alert('Person added successfully!');
            this.resetForm();
          },
          error: (error) => console.error(error)
        });
      }
    } catch (error) {
      console.error('Failed to fetch coordinates', error);
    }
  }

  deleteVehicle(id: any): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.http.delete(`http://localhost:8080/vehicles/${id}`).subscribe({
        next: () => {
          alert('Person deleted successfully!');
          this.resetForm();
        },
        error: (error) => console.error(error)
      });
    }
  }

  resetForm(): void {
    this.selectedPerson = null;
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.wheelchairUser = false;
    this.startPoint = '';
    this.endPoint = '';
    this.loadPeople(); // Reload vehicles to reflect changes
  }

  async ngOnInit(): Promise<void> {
    this.loadPeople();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const routeId = +id;
      this.routeDetails = await firstValueFrom(this.http.get<Person>(`http://localhost:8080/routes/${routeId}`));
      this.initMap();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (!this.routeDetails.startPointLatitude || !this.routeDetails.startPointLongitude) {
      console.error("Start point coordinates are missing.");
      return;
    }

    this.map = L.map('map').setView([this.routeDetails.startPointLatitude, this.routeDetails.startPointLongitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.routeDetails.endPointLatitude && this.routeDetails.endPointLongitude) {
      this.drawRoute();
    }
  }

  private drawRoute(): void {
    if (!this.routeDetails.startPointLatitude || !this.routeDetails.startPointLongitude || !this.routeDetails.endPointLatitude || !this.routeDetails.endPointLongitude) {
      console.error('Start or end coordinates are missing');
      return;
    }

    const apiKey = '5b3ce3597851110001cf6248c1bc8ce508ea4d3e94b1128c7c3478be'; // Use your actual OpenRouteService API key
    const start = `${this.routeDetails.startPointLongitude},${this.routeDetails.startPointLatitude}`;
    const end = `${this.routeDetails.endPointLongitude},${this.routeDetails.endPointLatitude}`;
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

}

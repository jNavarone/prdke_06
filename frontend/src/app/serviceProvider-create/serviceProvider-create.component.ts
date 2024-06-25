import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeocodeService } from '../geocode-service/geocode.service'; // Ensure this path matches your project structure
import { firstValueFrom } from 'rxjs';

interface ServiceProvider {
  id?: any;
  companyName: string;
  emailAddress: string;
  startPoint: any;
  startPointLatitude?: any;
  startPointLongitude?: any;
}

@Component({
  selector: 'app-serviceProvider-form',
  templateUrl: './serviceProvider-create.component.html',
  styleUrls: ['./serviceProvider-create.component.scss']
})
export class ServiceProviderCreateComponent implements OnInit {
  serviceProviders: ServiceProvider[] = [];
  selectedServiceProvider: ServiceProvider | null = null;

  // Form fields
  companyName: string = '';
  emailAddress: string = '';
  startPoint: string = '';

  constructor(private http: HttpClient, private geocodeService: GeocodeService) {}

  ngOnInit() {
    this.loadServiceProviders();
  }

  loadServiceProviders(): void {
    this.http.get<ServiceProvider[]>('http://localhost:8080/providers/').subscribe({
      next: (data) => this.serviceProviders = data,
      error: (error) => console.error(error)
    });
  }

  async saveServiceProvider(): Promise<void> {
    try {
      console.log('Attempting to fetch coordinates'); // Check if execution reaches here
      const startPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.startPoint));
      console.log('Start Point Coordinates:', startPointCoords); // Log fetched coordinates
      //const endPointCoords = await firstValueFrom(this.geocodeService.getCoordinates(this.endPoint));
      //console.log('End Point Coordinates:', endPointCoords); // Log fetched coordinates
      const serviceProvider: ServiceProvider = {
        id: this.selectedServiceProvider?.id,
        companyName: this.companyName,
        emailAddress: this.emailAddress,
        startPoint: this.startPoint,
        startPointLatitude: startPointCoords.latitude,
        startPointLongitude: startPointCoords.longitude,
      };

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      if (serviceProvider.id) {
        this.http.put(`http://localhost:8080/providers/${serviceProvider.id}`, serviceProvider, httpOptions).subscribe({
          next: () => {
            alert('Transportdienstleister erfolgreich hinzugefügt!');
            this.resetForm();
          },
          error: (error) => console.error(error)
        });
      } else {
        this.http.post('http://localhost:8080/providers/', serviceProvider, httpOptions).subscribe({
          next: () => {
            alert('Transportdienstleister erfolgreich hinzugefügt!');
            this.resetForm();
          },
          error: (error) => console.error(error)
        });
      }
    } catch (error) {
      console.error('Failed to fetch coordinates', error);
    }
  }

  resetForm(): void {
    this.selectedServiceProvider = null;
    this.companyName = '';
    this.emailAddress = '';
    this.startPoint = '';
    this.loadServiceProviders(); // Reload persons to reflect changes
  }
}

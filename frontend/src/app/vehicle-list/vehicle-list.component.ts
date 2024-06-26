import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Vehicle {
  id: number;
  vehicleName: string;
  vehicleType: string;
  wheelchairUser: boolean;
  vehicleSeats: number;
  companyName: string;
}

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    const providerId = localStorage.getItem('providerId');
    this.http.get<Vehicle[]>(`http://localhost:8080/vehicles/?providerId=${providerId}`).subscribe({
      next: (data) => this.vehicles = data,
      error: (error) => console.error(error)
    });
  }

  editVehicle(id: number): void {
    this.router.navigate(['/editVehicle', id]); // Adjust the route as needed
  }

  deleteVehicle(id: number): void {
    const providerId = localStorage.getItem('providerId');
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.http.delete(`http://localhost:8080/vehicles/${id}?providerId=${providerId}`).subscribe({
        next: () => {
          alert('Vehicle deleted successfully!');
          this.loadVehicles(); // Refresh the list after deletion
        },
        error: (error) => console.error(error)
      });
    }
  }
}
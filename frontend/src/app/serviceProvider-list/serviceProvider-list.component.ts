import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

interface ServiceProvider {
  id: number;
  companyName: string;
  eMailAddress: string;
  startPoint: string;
}

@Component({
  selector: 'app-serviceProvider-list',
  templateUrl: './serviceProvider-list.component.html',
  styleUrls: ['./serviceProvider-list.component.scss']
})
export class ServiceProviderListComponent implements OnInit {
  serviceProviders: ServiceProvider[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadServiceProviders();
  }

  loadServiceProviders(): void {
    this.http.get<ServiceProvider[]>('http://localhost:8080/serviceProviders/').subscribe({
      next: (data) => this.serviceProviders = data,
      error: (error) => console.error(error)
    });
  }

  editServiceProvider(id: number): void {
    this.router.navigate(['/editServiceProvider', id]);
  }

  deleteServiceProvider(id: number): void {
    if (confirm('Sind Sie sicher das sie den Transportdienstleister löschen möchten?')) {
      this.http.delete(`http://localhost:8080/serviceProviders/${id}`).subscribe({
        next: () => {
          alert('Transportdienstleister erfolgreich gelöscht!');
          this.loadServiceProviders(); // Refresh the list after deletion
        },
        error: (error) => console.error(error)
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Route {
  id?: number;
  vehicleId?: number;
  vehicleName: string;
  vehicleType: string;
  startPoint: string;
  startPointLatitude?: number;
  startPointLongitude?: number;
  endPoint: string;
  endPointLatitude?: number;
  endPointLongitude?: number;
}

interface Vehicle {
  id?: number;
  vehicleType: string;
  vehicleName: string;
  seats: number;
  wheelchairAccessible: boolean;
  startPoint?: string;
  startPointLatitude?: number;
  startPointLongitude?: number;
  endPoint?: string;
  endPointLatitude?: number;
  endPointLongitude?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}

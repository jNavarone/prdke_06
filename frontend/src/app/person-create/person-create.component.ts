import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeocodeService } from '../geocode-service/geocode.service'; // Ensure this path matches your project structure
import { firstValueFrom } from 'rxjs';

interface Person {
  id?: any;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  wheelchairUser: boolean;
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
export class PersonCreateComponent implements OnInit {
  persons: Person[] = [];
  selectedPerson: Person | null = null;

  // Form fields
  firstName: string = '';
  lastName: string = '';
  birthday: string = '';
  gender: string = '';
  wheelchairUser: boolean = false;
  startPoint: string = '';
  endPoint: string = '';

  constructor(private http: HttpClient, private geocodeService: GeocodeService) {}

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons(): void {
    this.http.get<Person[]>('http://localhost:8080/people/').subscribe({
      next: (data) => this.persons = data,
      error: (error) => console.error(error)
    });
  }

  async savePerson(): Promise<void> {
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
        birthday: this.birthday,
        gender: this.gender,
        wheelchairUser: this.wheelchairUser,
        startPoint: this.startPoint,
        endPoint: this.endPoint,
        startPointLatitude: startPointCoords.latitude,
        startPointLongitude: startPointCoords.longitude,
        endPointLatitude: endPointCoords.latitude,
        endPointLongitude: endPointCoords.longitude,
      };

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      if (person.id) {
        this.http.put(`http://localhost:8080/people/${person.id}`, person, httpOptions).subscribe({
          next: () => {
            alert('Person erfolgreich hinzugefügt!');
            this.resetForm();
          },
          error: (error) => console.error(error)
        });
      } else {
        this.http.post('http://localhost:8080/people/', person, httpOptions).subscribe({
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

  resetForm(): void {
    this.selectedPerson = null;
    this.firstName = '';
    this.lastName = '';
    this.birthday = '';
    this.gender = '';
    this.wheelchairUser = false;
    this.startPoint = '';
    this.endPoint = '';
    this.loadPersons(); // Reload persons to reflect changes
  }
}

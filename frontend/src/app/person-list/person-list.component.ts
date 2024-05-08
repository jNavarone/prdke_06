import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  wheelchairUser: boolean;
  startPoint: string;
  endPoint: string;
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.http.get<Person[]>('http://localhost:8080/people/').subscribe({
      next: (data) => this.persons = data,
      error: (error) => console.error(error)
    });
  }

  editPerson(id: number): void {
    this.router.navigate(['/editPerson', id]);
  }

  deletePerson(id: number): void {
    if (confirm('Sind Sie sicher das sie die Person löschen möchten?')) {
      this.http.delete(`http://localhost:8080/people/${id}`).subscribe({
        next: () => {
          alert('Person erfolgreich gelöscht!');
          this.loadPersons(); // Refresh the list after deletion
        },
        error: (error) => console.error(error)
      });
    }
  }
}

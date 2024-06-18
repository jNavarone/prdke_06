import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderListComponent } from './serviceProvider-list.component';

describe('ServiceProviderListComponent', () => {
  let component: ServiceProviderListComponent;
  let fixture: ComponentFixture<ServiceProviderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

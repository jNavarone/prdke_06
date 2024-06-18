import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderEditComponent } from './serviceProvider-edit.component';

describe('ServiceProviderEditComponent', () => {
  let component: ServiceProviderEditComponent;
  let fixture: ComponentFixture<ServiceProviderEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderEditComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

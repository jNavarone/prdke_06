import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderCreateComponent } from './serviceProvider-create.component';

describe('ServiceProviderFormComponent', () => {
  let component: ServiceProviderCreateComponent;
  let fixture: ComponentFixture<ServiceProviderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderCreateComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

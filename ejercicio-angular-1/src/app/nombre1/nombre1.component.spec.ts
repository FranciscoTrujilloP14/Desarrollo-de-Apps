import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nombre1Component } from './nombre1.component';

describe('Nombre1Component', () => {
  let component: Nombre1Component;
  let fixture: ComponentFixture<Nombre1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nombre1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nombre1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

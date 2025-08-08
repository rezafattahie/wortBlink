import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorceInputComponent } from './sorce-input.component';

describe('SorceInputComponent', () => {
  let component: SorceInputComponent;
  let fixture: ComponentFixture<SorceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorceInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

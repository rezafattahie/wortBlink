import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sourceInputComponent } from './source-input.component';


describe('sourceInputComponent', () => {
  let component: sourceInputComponent;
  let fixture: ComponentFixture<sourceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sourceInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(sourceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

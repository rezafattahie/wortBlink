import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordHighlightComponent } from './word-highlight.component';

describe('WordHighlightComponent', () => {
  let component: WordHighlightComponent;
  let fixture: ComponentFixture<WordHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

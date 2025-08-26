import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from './services/translate.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { WordHighlightComponent } from './components/word-highlight/word-highlight.component';
import { sourceInputComponent } from './components/source-input/source-input.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TranslateService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'wort blink' title`, () => {
    expect(component.title).toEqual('Wort blink');
  });

  // CHILDREN EMITS
  it('should update textToProcess when sourceInputComponent emits a text', () => {
    const sourceInputEl = fixture.debugElement.query(
      By.directive(sourceInputComponent)
    );
    const sourceInputCompo =
      sourceInputEl.componentInstance as sourceInputComponent;

    sourceInputCompo.text.emit('I came from source-input.component');
    expect(component.textToProcess).toBe('I came from source-input.component');
  });

  it('sould update selectedWord when word-highlight.componet emits selectedWord', () => {
    const wordHighlightEl = fixture.debugElement.query(
      By.directive(WordHighlightComponent)
    );
    const wordHighlightCompo =
      wordHighlightEl.componentInstance as WordHighlightComponent;

    wordHighlightCompo.selectedWord.emit('unitTest_selectedWord');
    expect(component.selectedWord).toBe('unitTest_selectedWord');
  });

  // DOM RENDERS
  it('should render app-source-input', () => {
    const compile = fixture.nativeElement as HTMLElement;
    expect(compile.querySelector('app-source-input')).not.toBeNull();
  });

  it('should render app-word-highlight', () => {
    const compile = fixture.nativeElement as HTMLElement;
    expect(compile.querySelector('app-word-highlight')).not.toBeNull();
  });

  it('should render app-word-list', () => {
    const compile = fixture.nativeElement as HTMLElement;
    expect(compile.querySelector('app-word-list')).not.toBeNull();
  });

  it('should render app-loader', () => {
    const compile = fixture.nativeElement as HTMLElement;
    expect(compile.querySelector('app-loader')).not.toBeNull();
  });
});

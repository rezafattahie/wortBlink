import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { LoaderInterceptor } from './loader.interceptor.service';
import { LoaderService } from './loader.service';

describe('LoaderInterceptor', () => {
  let service : LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        provideHttpClient(withInterceptors([LoaderInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

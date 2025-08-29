import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { LoaderInterceptor } from './loader.interceptor.service';
import { LoaderService } from './loader.service';

describe('LoaderInterceptor', () => {
  let loaderService: LoaderService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        provideHttpClient(withInterceptors([LoaderInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    loaderService = TestBed.inject(LoaderService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should call show() whenever a request is started', () => {
    const showSpy = spyOn(loaderService, 'show').and.callThrough(); //makes an spy on show method
    http.get('/testUrl').subscribe();
    httpMock.expectOne('/testUrl'); //  request is pending, it is not finished yet
    expect(showSpy).toHaveBeenCalled();
  });

  it('should call hide() whenever the request returns a response', () => {
    const hideSpy = spyOn(loaderService, 'hide').and.callThrough(); //makes an spy on hide method
    http.get('/testUrl').subscribe();
    const request = httpMock.expectOne('/testUrl'); //  request is pending
    request.flush({}); // simulate response (response is gotten)
    expect(hideSpy).toHaveBeenCalled();
  });

    it('should call hide() whenever the request returns an ERROR', () => {
    const hideSpy = spyOn(loaderService, 'hide').and.callThrough(); //makes an spy on hide method
    http.get('/testUrl').subscribe({
      error: (err: HttpErrorResponse)=>{
        expect(err.status).toBe(500)
      }
    }); // get ERROR on subscribe

    const request = httpMock.expectOne('/testUrl'); //  request is pending
    request.flush('error', {status: 500 , statusText: 'Server Error'}); // simulate ERROR (response is not gotten)
    expect(hideSpy).toHaveBeenCalled();
  });
});

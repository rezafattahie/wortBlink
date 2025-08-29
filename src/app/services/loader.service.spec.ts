import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { firstValueFrom } from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with "isLoading=false"', async () => {
    const value = await firstValueFrom(service.isLoading$);
    expect(value).toBeFalse();
  });

  it('should change "isloading" to true when show() is called', async () => {
    service.show();
    const value = await firstValueFrom(service.isLoading$);
    expect(value).toBeTrue();
  });

  it('should change "isloading" to false when hide() is called', async () => {
    service.show();
    service.hide();
    const value = await firstValueFrom(service.isLoading$);
    expect(value).toBeFalse();
  });
});

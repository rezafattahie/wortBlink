import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';
import { NO_LOADER } from '../loader/loader-context';


export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  const skipLoader = req.context.get(NO_LOADER);  // to check loading spinner is requested or not (by default it is requested)

  if (!skipLoader) {
    loader.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!skipLoader) {
        loader.hide();
      }
    })
  );
};

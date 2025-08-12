import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
}

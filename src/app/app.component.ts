import { Component, InjectionToken } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IApiService } from './lib/api/api.service';
import { ApiServiceFactory } from './lib/api/api.factory';

export const API_SERVICE_TOKEN = new InjectionToken<IApiService>('apiService');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    { provide: API_SERVICE_TOKEN, useFactory: ApiServiceFactory.create }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}

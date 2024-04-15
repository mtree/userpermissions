import { Component, InjectionToken } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IApiService } from './lib/api/api.interface';
import { ApiService } from './lib/api/api.service';

export const API_SERVICE_TOKEN = new InjectionToken<IApiService>('apiService');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [{ provide: API_SERVICE_TOKEN, useClass: ApiService }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}

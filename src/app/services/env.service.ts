import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8000/LaraMovil_backend/api';
  constructor() { }
}

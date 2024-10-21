import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ "apiKey": "AIzaSyBIA3rWRnvyvGM2VI6AgOnbtgEUtOhGsCY",
    "authDomain": "simple-crm-6733d.firebaseapp.com",
    "projectId": "simple-crm-6733d",
    "storageBucket": "simple-crm-6733d.appspot.com",
    "messagingSenderId": "1023126924437",
    "appId": "1:1023126924437:web:8f937be0291fb44fac7f9c"})), provideFirestore(() => getFirestore())]
};

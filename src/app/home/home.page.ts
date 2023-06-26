import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ViewDidEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit, ViewDidEnter {
  @ViewChild('map')mapRef: ElementRef <HTMLElement> ;
  map: GoogleMap;
  constructor() { }
  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: -28.681328,
          lng: -49.374067
        },
        zoom: 15,
      }
    })
    this.mapRef.nativeElement.style.position = "relative"
  }

}


import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'home' },
    { title: 'Computador', url: '/computadores', icon: 'desktop' },
    { title: 'Marca', url: '/marcas', icon: 'square' },
    { title: 'Cliente', url: '/clientes', icon: 'person' },
    { title: 'Clientes favoritos', url: '/clientes/favoritos', icon: 'heart'},
  ];
  
  constructor() {}

  toggleTheme(event:  any){
    if(event.detail.checked){
      document.body.setAttribute("color-theme","dark")
    }else{
      document.body.setAttribute("color-theme","light")
    }
  }


}


import { Component, ViewChild, ElementRef,OnInit, NgZone, state } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimeoutDebouncer } from 'ionic-angular/util/debouncer';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Destination: any = '';
  MyLocation: any;


  GoogleAutoComplete;
  autocomplete;
  autocompleteItems;

  constructor(public authprovider: AuthProvider,public geolocation: Geolocation,private zone: NgZone,public navCtrl: NavController) {
    this.GoogleAutoComplete = new google.maps.places.AutocompleteService();
    this.Destination = '';
    this.autocompleteItems = [];
  }

  updateSearchResults() {
    if (this.Destination == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutoComplete.getPlacePredictions({ input: this.Destination }, (predictions, status) => {
      this.autocompleteItems = [];

      this.zone.run(() => {
        predictions.forEach(prediction => {
          this.autocompleteItems.push(prediction)
        });
      })
    })

  }

  calculateAndDisplayRoute(item) {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);

      }, function () {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

logout() {
  this.authprovider.signout()
  this.navCtrl.pop()
}

}

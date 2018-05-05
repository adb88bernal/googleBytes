import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import {} from '@types/googlemaps'; 

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  //variables to be used throughout to give data back to html
  savedItems = [];
  fullDetails = [];

  //lat and long value for google maps (using agm-core api)
  lat: any;
  lng: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    //takes off the active class from the nav bar, looks annoying if not taken off
    document.getElementById('nav-profile-tab').classList.remove("active")
    document.getElementById('nav-home-tab').classList.remove('active')

    //get saved items from local storage
    this.savedItems = JSON.parse(window.localStorage.getItem('saved_list')); 

    //gets the id from the params and sends it to function to get full details
    let id = this.route.snapshot.params['id']
    this.getFullDetails(id)
  }

  getFullDetails(id){

    //loops through data taken from local storage and finds item with passed through id
    for(var i = 0; i < this.savedItems.length; i++){
      if(this.savedItems[i].place_id == id){

        //gets the lat and long from place to pass to html and render map
        this.lat = this.savedItems[i].geometry.location.lat;
        this.lng = this.savedItems[i].geometry.location.lng;

        //gets all the details and stores them in object to push to main list
        let detail = {
          address: this.savedItems[i].formatted_address,
          phone: this.savedItems[i].formatted_phone_number,
          icon: this.savedItems[i].icon,
          name: this.savedItems[i].name,
          hours: this.savedItems[i].opening_hours,
          rating: this.savedItems[i].rating,
          categories: this.savedItems[i].types,
          website: this.savedItems[i].website,
          google_page: this.savedItems[i].url
        }

        //little styling, changes title  from Google Bytes to name of place looking user is looking at
        document.getElementById('title').innerHTML = this.savedItems[i].name;

        // full details are passed to html array
        this.fullDetails.push(detail);
      }
    }
  }


}

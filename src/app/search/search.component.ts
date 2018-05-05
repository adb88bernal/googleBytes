import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //set up globals to used lat and lng for google maps
  resultsArray: Array<any>;
  listResults: Array<any>;
  lat: any;
  long: any;
  service: any;


  @ViewChild('search') public searchElement: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader, 
              private ngZone: NgZone) {

              this.resultsArray;
              } 

  ngOnInit() {
        //change the title back to normal 
        document.getElementById('title').innerHTML = 'Google Bytes';

    // functionality to allow for autocomplete
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
        types:[]});
      autocomplete.addListener('place_changed', ()=>{
        this.ngZone.run(()=>{
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //takes the lat and long from the auto complete and inserts them into the globals
          this.lat = place.geometry.location.lat();
          this.long = place.geometry.location.lng();
        })
      })
    });
  }


  updateMap(){
    //get the query value from html to input in search
    var x_1 = document.getElementById('selectItem') as HTMLSelectElement;
    var x = x_1.selectedIndex;
    let type = document.getElementsByTagName('option')[x].value;


    //change height to make map visable
    document.getElementById('map').style.height = '20rem';

    //gets local variables to insert results from google maps api request
    let listResults: Array<any>;
    listResults = [];
    var service;

    // takes global lat and long values and inserts them to one LatLgn variable
    let place = {
        lat: this.lat, 
        lng: this.long
      };

    //sets up google maps using lat and lng from auto complete
    let map = new google.maps.Map(document.getElementById('map'), {
      center: place,
      zoom: 15
    });


    //sets up infomation when that is displayed when marker is click on map
    let infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: place,
      radius: 500,
      query: type,
    }, callback);

    //takes info from the google maps requests and callback which gets
    //markers on the map and saves results to results array
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          var placeId: any;

          //setting up request to make getDetails api request
          var request = {
            placeId: results[i].place_id
          };

          //need to set up iffy and set time interval to get details request 
          // set time interval because api only allows 10 results per every 10 seconds. 
          ((j)=>{
            var request = {
              placeId: results[i].place_id
            };

            setTimeout(()=>{
              service.getDetails(request, callback2);
            }, j*1000)

          })(i);
        }
      }
    }

    //callback to save results to array for future use
    function callback2(results, status){
        saveResults(results)
    }

    //function will create markers on map for all locations
    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      //when marker is clicked info is displayed on map
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    //function that pushes new item to local array
    function saveResults(results){
      listResults.push(results);
    }

    //making html results array equal to new list results array
    this.resultsArray = listResults;
  }

}

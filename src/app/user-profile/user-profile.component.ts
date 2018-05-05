import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //need results array to spill out results
  savedItem = [];
  title = 'My Saved Items';
  states = [];

  constructor() { }

  ngOnInit() {
    //change the title back to normal 
    document.getElementById('title').innerHTML = 'Google Bytes';

    //check local storage here
    this.onCheckStorage();
    //adding active class to navbar page and removing from home
    document.getElementById('nav-profile-tab').classList.add("active")
    document.getElementById('nav-home-tab').classList.remove('active')
  }

  //create delete button to remove from list
  onCheckStorage(){
    if(localStorage.getItem('saved_list') == null){
      this.savedItem = [];
    } else {
      this.savedItem = JSON.parse(window.localStorage.getItem('saved_list')); 
      this.onGetCategories(this.savedItem);
    }
  }

  //will get each state of saved item to sort in html
  onGetCategories(items){
    for(var i = 0; i < items.length; i++){
      let place_state = items[i].address_components[3].long_name;
      var isInArray = this.states.find((item: any)=>{
        return item === place_state;
      }) !== undefined;

      if(!isInArray){
        this.states.push(place_state);
        this.states.sort();
      }
    }

  }

  //will delete item from list and store values in local storage
  onDeleteItem(index){
    this.savedItem.splice(index, 1);

    let key = 'saved_list';
    window.localStorage.setItem(key, JSON.stringify(this.savedItem));
  }


}


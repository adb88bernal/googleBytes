import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  resultsArray: Array<any>;
  savedItem = [];

  constructor() { }

  ngOnInit() {
    this.onCheckStorage();
  }

  //function that checks local storage and sets arrays to results
  onCheckStorage(){
    if(localStorage.getItem('saved_list') == null){
      this.savedItem = [];
      document.getElementById('initalHeader').innerHTML = "<h3 style='padding: 1rem;text-align: center;font-weight: 200;'>Save Items Here</h3>";

    } else {
      this.resultsArray = JSON.parse(window.localStorage.getItem('saved_list'));
      this.savedItem = JSON.parse(window.localStorage.getItem('saved_list'));

      if(this.resultsArray.length <= 0){
        document.getElementById('initalHeader').innerHTML = "<h3 style='padding: 1rem;text-align: center;font-weight: 200;'>Save Items Here</h3>";
        console.log('working')
      } else{ 
        document.getElementById('initalHeader').innerHTML = "";
      }
   
    }
  }

  saveItem(e: any){
    //once item is dropped into save area, previous text get taken off
    document.getElementById('initalHeader').innerHTML = "";

    //checks that there are no duplicate values,
    //if dropping item already in list then isInArray return true
    var isInArray = this.savedItem.find( (el: any) =>{
      return el.place_id === e.dragData.place_id
    }) !== undefined;
    
    //if item is not in array then add it
    if(!isInArray){
      this.savedItem.push(e.dragData);
    } 

    //add results to html array
    this.resultsArray = this.savedItem;

    //add to local storage
    let key = 'saved_list';
    window.localStorage.setItem(key, JSON.stringify(this.savedItem));
  }

  //simple function to delete saved item from list
  onDeleteItem(index){
    this.savedItem.splice(index, 1);
    this.resultsArray = this.savedItem;

    if(this.savedItem.length <= 0){
      document.getElementById('initalHeader').innerHTML = "<h3 style='padding: 1rem;text-align: center;font-weight: 200;'>Save Items Here</h3>";
    }

    let key = 'saved_list';
    window.localStorage.setItem(key, JSON.stringify(this.savedItem));
  }

}

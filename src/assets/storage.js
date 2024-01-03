const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
                    || window.msIndexedDB || window.shimIndexedDB;

var db;

const request = indexedDB.open("UsersDatabase",1);

request.onerror = function(event){
  console.log("an error occurred with IndexDB : "+ event.target.result);
}

request.onupgradeneeded = function(){
  var db = request.result;;
  const store = db.createObjectStore("users",{keyPath:"id"});
}

request.onsuccess = function () {
  console.log("Database opened successfully");
  db = request.result;
}

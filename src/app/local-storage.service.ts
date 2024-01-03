import { Injectable } from '@angular/core';
import { User } from './models/user.model';
declare var db:any
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addNewUser(value: any){
    return new Promise(async(resolve,reject)=>{
    const transaction = await db.transaction(["users"], "readwrite");
    const store = await transaction.objectStore("users");
    const request = store.add(value);
    request.onsuccess = await function (event:any) {
       if(event.target.result){
          console.log("success");
          resolve(true);
       }else{
          reject("error");
       }
    }})
  }

  editUser(value: any){
    return new Promise(async(resolve,reject)=>{
    const transaction = await db.transaction(["users"], "readwrite");
    const store = await transaction.objectStore("users");
    const request = store.put(value);
    request.onsuccess = await function (event:any) {
       if(event.target.result){
          console.log("success");
          resolve(true);
       }else{
          reject("error");
       }
    };
  })
  }

  getAllData(): Promise<User[]> {
    return new Promise(async(resolve,reject)=>{
      const transaction = await db.transaction("users", "readwrite");
      const store = await transaction.objectStore("users");
      const request = await store.getAll();
      console.log("get alll ",request)
      request.onsuccess = await function (event:any) {
         if(event.target.result){
            console.log("success get all data",event.target.result);
            resolve(request.result);
         }else{
            reject("error");
         }
      };
    })
  }

  getUserById(id:any){
    return new Promise(async(resolve,reject)=>{
      const transaction = await db.transaction("users", "readwrite");
      const store = await transaction.objectStore("users");
      const request = store.get(id);
      request.onsuccess = await function (event:any) {
         if(event.target.result){
            console.log("success");
            resolve(true);
         }else{
            reject("error");
         }
      };
    })
  }

  deleteUserById(id: any){
    return new Promise(async(resolve,reject)=>{
      const transaction = await db.transaction("users", "readwrite");
      const store = await transaction.objectStore("users");
      const request = store.delete(id);
      request.onsuccess = await function (event:any) {
         if(event.target.result){
            console.log("success");
            resolve(true);
         }else{
            reject("error");
         }
      };
    })
  }
}


import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  public config:any={}
  constructor() {
    this.config={
      dn:'http://42.192.251.197/',
    }
  }
  getData(api:any){
    let url=this.config.dn+api;
    return new Promise((resolve,reject)=>{
      axios.get(url).then((response)=>{
        resolve(response)
      },(err)=>{
        reject(err)
      })
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GetDataService } from '../services/getdata.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pdetail',
  templateUrl: './pdetail.page.html',
  styleUrls: ['./pdetail.page.scss'],
})
export class PdetailPage implements OnInit {

  public selectvalue:any='info';
  public pdetail:any={};
  public config:any=[];
  public num:number=1;
  public cartnum:number=0;
  constructor(private nav:NavController,private gds:GetDataService,private ac:ActivatedRoute) {
    this.config=gds.config;
   }

  ngOnInit() {
    this.ac.queryParams.subscribe((data:any)=>{
      this.getPdetail(data.id);
    })
    this.getcartnum();
  }
  goback(){
    this.nav.back();
  }
  getPdetail(id:any){
    this.gds.getData('shop/api/pdetail.php?id='+id).then((response:any)=>{
      this.pdetail=response.data.result[0];
    })
  }
  selectValue(e:any){
    let el=e.target;
    if(el.nodeName=="SPAN"){
      let parent=el.parentNode;
      let children=parent.children;
      for(let i = 0;i<children.length;i++){
        children[i].className='';
      }
      el.className="active";
    }
  }
  sub(){
    if(this.num>1){
      this.num--;
    }
  }
  plus(){
    this.num++;
  }
  addcart(){
    let product_title=this.pdetail.title;
    let product_id=this.pdetail.id;
    let product_pic=this.pdetail.pic;
    let product_price=this.pdetail.price;
    let product_count=this.num;
    let product_attr="";

    let activeSpan=document.querySelectorAll(".r_attr .active");
    for(let i=0; i<activeSpan.length;i++){
      if(i==0){
        product_attr=activeSpan[i].innerHTML;
      }else{
        product_attr+=" "+activeSpan[i].innerHTML
      }
    }
    let productJson={
      product_title,
      product_id,
      product_pic,
      product_price,
      product_count,
      product_attr
    };
    let cartlist=JSON.parse(localStorage.getItem('cartlist') || '{}');
    
    if(cartlist &&cartlist.length>0){
      if(this.hasProduct(cartlist,productJson)){
        for(let i=0;i<cartlist.length;i++){
          if(cartlist[i].product_id==productJson.product_id&&cartlist[i].product_attr==productJson.product_attr){
            cartlist[i].product_count+=productJson.product_count
            localStorage.setItem('cartlist',JSON.stringify(cartlist));
          }
        }
      }else{
        cartlist.push(productJson)
        localStorage.setItem('cartlist',JSON.stringify(cartlist));
      }
    }else{
      let temp:any[]=[];
      temp.push(productJson);
      localStorage.setItem('cartlist',JSON.stringify(temp));
    }
    this.cartnum+=productJson.product_count;
  }
  hasProduct(cartlist:any,product:any):boolean{
    if(cartlist &&cartlist.length>0){
      for(let i=0;i<cartlist.length;i++){
        if(cartlist[i].product_id==product.product_id&&cartlist[i].product_attr==product.product_attr){
          return true
        }
      }
      return false;
    }
    return false;
  }
  getcartnum(){
    let cartlist=JSON.parse(localStorage.getItem('cartlist') || '{}');
    let sum=0;
    if(cartlist &&cartlist.length>0){
      for(let i=0;i<cartlist.length;i++){
        sum+=cartlist[i].product_count;
      }
      this.cartnum=sum;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GetDataService } from '../services/getdata.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  public flag: boolean = false;
  public config: any = [];
  public cid: any = 1;
  public page: number = 1;
  public selectid: any = '';
  public sort: any = '_id:1';

  public subheader: any = [
    {
      id: 1,
      title: '综合',
      field: '_id',
      sort: 1
    },
    {
      id: 2,
      title: '销量',
      field: 'salecount',
      sort: 1
    },
    {
      id: 3,
      title: '价格',
      field: 'price',
      sort: 1
    }];

  productlist: Array<any> = [];
  constructor(private nav: NavController, private gds: GetDataService, private act: ActivatedRoute) {
    this.config = gds.config;
    this.act.queryParams.subscribe((data: any) => {
      this.cid = data.cid;

    });
  }

  ngOnInit() {
    this.getProductlist(null);
  }
  goback() {
    this.nav.back();
  }
  getProductlist(event: any) {
    this.gds.getData('shop/api/plist.php?cid=' + this.cid + "&page=" + this.page + "&sort=" + this.sort).then((response: any) => {
      this.productlist = this.productlist.concat(response.data.result);
      this.page++;
      console.log(response);
      if (event) {
        event.target.complete();
        if (response.result.length < 8) {
          event.target.disabled = true;
        }
      }
    })
  }
  headerChange(id: any) {
    this.selectid = id;
    this.productlist = [];
    this.page = 1;
    this.sort = this.subheader[id - 1].field + ":" + this.subheader[id - 1].sort;
    this.subheader[id - 1].sort = this.subheader[id - 1].sort * (-1);
    this.getProductlist(null);
  }
}

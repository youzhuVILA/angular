import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GetDataService } from '../services/getdata.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
  constructor(private nav: NavController, private gds: GetDataService, private act: ActivatedRoute, private toastController: ToastController, private alertController: AlertController) {
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
  async deleteItem(item: any) {
    const alert = await this.alertController.create({
      header: '确认删除',
      message: '确定要删除这个商品吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '删除',
          handler: async () => {
            try {
              await this.gds.getData('shop/api/delete.php?id=' + item._id);
              this.productlist = this.productlist.filter(p => p._id !== item._id);
              
              // 添加成功提示
              const toast = await this.toastController.create({
                message: '删除成功',
                duration: 1500,
                position: 'top',
                color: 'success'
              });
              await toast.present();
              
            } catch (error) {
              const toast = await this.toastController.create({
                message: '删除失败，请重试',
                duration: 2000,
                position: 'top',
                color: 'danger'
              });
              await toast.present();
            }
          }
        }
      ]
    });
    
    await alert.present();
  }
}

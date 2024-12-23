import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GetDataService } from '../services/getdata.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lcate: Array<any> = [];
  rcate: Array<any> = [];

  public config: any = [];
  public rparentid = "";
  constructor(private nav: NavController, private gds: GetDataService) {
    this.config = gds.config;
  }
  gosearch() {
    this.nav.navigateForward('search');
  }
  getlcate() {
    let api = 'shop/api/pcate.php'
    this.gds.getData(api).then((response: any) => {
      this.lcate = response.data.result;
      console.log(response);
      this.getRcate(this.lcate[0]._id)
    })
  }

  ngOnInit(): void {
    this.gds.getData('shop/api/pcate.php').then((response: any) => {
      this.lcate = response.data.result;
      this.getRcate(this.lcate[0]._id)
    })
  }

  getRcate(pid: any) {
    this.rparentid = pid;
    this.gds.getData('shop/api/pcate.php?pid=' + pid).then((response: any) => {
      this.rcate = response.data.result;
    })
  }

}
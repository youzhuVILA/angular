import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GetDataService } from '../services/getdata.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public config: any = [];
  hotlist: Array<any> = [];
  plist: Array<any> = [];
  constructor(private nav: NavController, private gds: GetDataService) {
    this.config = gds.config;
  }
  ngOnInit(): void {
    this.gds.getData('shop/api/photlist.php').then((response: any) => {
      this.hotlist = response.data.result;
    })
    this.gds.getData('shop/api/plist.php').then((response: any) => {
      this.plist = response.data.result;
      console.log(response);
    })

  }
  gosearch() {
    this.nav.navigateForward('search');
  }
}

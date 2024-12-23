import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public flag: boolean = false;
  constructor(private nav: NavController) { }
public num:Array<number> =[1,2,3,4,5,6,7,8,9];
  ngOnInit() {
  }
  goback() {
    this.nav.back();
  }
  search() {
    this.flag = true;
  }
}

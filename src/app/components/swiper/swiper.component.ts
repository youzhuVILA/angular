import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { GetDataService } from 'src/app/services/getdata.service';
register();
@Component({
  standalone: true,
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent implements OnInit {
  slidelist: Array<any> = [];
  public config: any = [];

  constructor(private gds: GetDataService) {
    this.config = gds.config;
  }

  ngOnInit() {
    this.gds.getData('shop/api/focus.php').then((response: any) => {
      this.slidelist = response.data.result;
      console.log(response);
    })
  }
}

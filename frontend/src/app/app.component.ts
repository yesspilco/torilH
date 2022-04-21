import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'myJquery';

  //constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
    //this.primengConfig.ripple = true;
  }

}

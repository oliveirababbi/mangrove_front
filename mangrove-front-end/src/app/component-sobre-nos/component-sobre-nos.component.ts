import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-sobre-nos',
  templateUrl: './component-sobre-nos.component.html',
  styleUrls: ['./component-sobre-nos.component.css']
})
export class ComponentSobreNosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0)
  }

}

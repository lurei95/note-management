import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-bar-item',
  templateUrl: './header-bar-item.component.html',
  styleUrls: ['./header-bar-item.component.css']
})
export class HeaderBarItemComponent implements OnInit {

  private class: string;

  @Input() title: string;

  @Input() icon: string;

  private _isActive: boolean;
  @Input()
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.calculateClass();
  }
  
  constructor() { 
    this.calculateClass() 
  }

  ngOnInit() { }

  private calculateClass() { 
    this.class = this._isActive ? "active" : "normal";
  }
}
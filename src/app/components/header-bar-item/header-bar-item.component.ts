import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-bar-item',
  templateUrl: './header-bar-item.component.html',
  styleUrls: ['./header-bar-item.component.css']
})
export class HeaderBarItemComponent implements OnInit {

  private _class: string;
  get class() { return this.class; }

  @Input() title: string;

  @Input() icon: string;

  private _isActive: boolean;
  get isActive() { return this._isActive; }
  @Input()
  set isActive(isActive: boolean) { this._isActive = isActive; }
  
  constructor() { }

  ngOnInit() { }
}
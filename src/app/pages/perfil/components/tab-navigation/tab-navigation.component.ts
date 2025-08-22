import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TabType = 'dashboard' | 'reservas' | 'configuracion';

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.css']
})
export class TabNavigationComponent {
  @Input() activeTab: TabType = 'dashboard';
  @Output() tabChange = new EventEmitter<TabType>();

  onTabClick(tab: TabType): void {
    this.tabChange.emit(tab);
  }
}

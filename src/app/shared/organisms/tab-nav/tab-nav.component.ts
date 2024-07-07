import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { AlimentoDetail } from '@app/core/interfaces/alimeto-detail';
import { NavListItemComponent } from '@app/shared/molecules/nav-list-item/nav-list-item.component';
import { Tabs } from 'flowbite';
import type { TabsOptions, TabsInterface, TabItem } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { Aminoacido } from '../../../core/interfaces/aminoacido.interface';
import { Azucar } from '@app/core/interfaces/azucar.interface';
@Component({
  selector: 'app-tab-nav',
  standalone: true,
  imports: [CommonModule,NavListItemComponent],
  templateUrl: './tab-nav.component.html',
  styleUrl: './tab-nav.component.scss',
})
export class TabNavComponent implements AfterViewInit {
  @Input()
  alimento?: AlimentoDetail;
  @Input()
  azucar?: Azucar;
  @Input()
  aminoacido?: Aminoacido;

  @ViewChild('tabexample')
  tagNav!: ElementRef<HTMLElement>;

  tabElements: TabItem[] = [];

  options?: TabsOptions;
  instanceOptions?: InstanceOptions;
  tabs?: TabsInterface;
  constructor() {}
  ngAfterViewInit(): void {
    this.selectTabElements();
    this.selectOption();
    this.setInstance();
    console.log( this.tagNav.nativeElement,
      this.tabElements,
      this.options,
      this.instanceOptions);
    
    this.tabs = new Tabs(
      this.tagNav.nativeElement,
      this.tabElements,
      this.options,
      this.instanceOptions
    );
    // open tab item based on id
    this.tabs.show('profile');
  }

  selectTabElements() {
    this.tabElements = [
      {
        id: 'profile',
        triggerEl: document.querySelector(
          '#profile-tab-example'
        ) as HTMLElement,
        targetEl: document.querySelector('#profile-example') as HTMLElement,
      },
      {
        id: 'dashboard',
        triggerEl: document.querySelector(
          '#dashboard-tab-example'
        ) as HTMLElement,
        targetEl: document.querySelector('#dashboard-example') as HTMLElement,
      },
      {
        id: 'settings',
        triggerEl: document.querySelector(
          '#settings-tab-example'
        ) as HTMLElement,
        targetEl: document.querySelector('#settings-example') as HTMLElement,
      },
      {
        id: 'contacts',
        triggerEl: document.querySelector(
          '#contacts-tab-example'
        ) as HTMLElement,
        targetEl: document.querySelector('#contacts-example') as HTMLElement,
      },
      {
        id: 'azucar',
        triggerEl: document.querySelector(
          '#azucar-tab-example'
        ) as HTMLElement,
        targetEl: document.querySelector('#azucar-example') as HTMLElement,
      },
      {
        id: 'aminoacido',
        triggerEl: document.querySelector(
          '#aminoacido-tab-example'
        ) as HTMLElement,
        targetEl: document.querySelector('#aminoacido-example') as HTMLElement,
      },
    ];
  }

  selectOption() {
    this.options = {
      defaultTabId: 'settings',
      activeClasses:
        'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
      inactiveClasses:
        'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
      onShow: () => {
        console.log('show');
        
      },
    };
  }
  setInstance() {
    this.instanceOptions = {
      id: 'tabs-example',
      override: true,
    };
  }
}

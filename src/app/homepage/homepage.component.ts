import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { menu } from '../data';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  section: any;
  btnContainer: any;
  categoryNames: any;
  uniqueCategories: any;
  categoryBtns: any;
  Menu: any;
  DateYear: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit(): void {
    
    this.section = document.querySelector('.section-center');
    this.btnContainer = document.querySelector('.btn-container');
    this.categoryNames = menu.map((index) => index?.category);
    this.Menu = menu;
    this.DateYear = new Date().getFullYear();

    this.uniqueCategories = this.removeRepeatingNames(this.categoryNames);
    // this.menuList(menu);
    this.JQueryCodes();
    
    if (isPlatformBrowser(this.platformId)) {
      //Tarayıcıda çalışacak kodlar...
    }
    if (isPlatformServer(this.platformId)) {
      //Sunucuda çalışacak kodlar...
    }

  }
  JQueryCodes() {
    $(document).ready(() => {
      console.log('jquery ready');
    });
  }

  removeRepeatingNames(data: any) {
    return [...new Set(data)]
  }
  menuList(categoryMenu: any) {
    let currentMenu = categoryMenu.map((item: any) => {
      return `
      <div class="menu-items col-lg-6 col-sm-12">
      <img
      src=${item.img}
      alt=${item.title}
      class="photo"/>
      <div class="menu-info">
      <div class="menu-title">
      <h4>${item.title}</h4>
      <h4 class="price">${item.price}</h4>
      </div>
      <div class="menu-text">
      ${item.desc}
      </div>
      </div>
      </div>`;
    }).join('');

    this.section.innerHTML = currentMenu;

  }
  categoryList() {
    this.categoryBtns = this.uniqueCategories.map((name: any) => {
      return `<button data-category=${name} class="btn btn-outline-dark btn-item" >
             ${name}
             </button>`;
    }).join('');

    this.btnContainer.innerHTML = this.categoryBtns;
    const filterButtons = document.querySelectorAll(".btn-item");

    filterButtons.forEach((button) => {

      button.addEventListener('click', (event: any) => {
        let category = event.currentTarget.dataset.category;
        const menuCategory = menu.filter((item: any) => {
          if (item.category === category) { return category; }
        });

        this.menuList(menuCategory);
      });
    });

  }

}
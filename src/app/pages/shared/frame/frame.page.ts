import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.page.html',
  styleUrls: ['./frame.page.scss'],
})
export class FramePage implements OnInit {

  constructor(private menuController: MenuController,
              private navController: NavController) { }

  ngOnInit() {
  }

  goToPage(page: string) {
    this.menuController.close();
    this.navController.navigateRoot(page);
  }

}

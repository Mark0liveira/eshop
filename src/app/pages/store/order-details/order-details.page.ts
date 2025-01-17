import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { StatusUtil } from 'src/app/utils/status.util';
import { SecurityUtil } from 'src/app/utils/security.util';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public order = null;

  constructor(
    private route: ActivatedRoute,
    private service: DataService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('number');
    this.service
      .getOrder(id)
      .subscribe((data) => {
        this.order = data;
      });
  }

  translateOrderStatus(status: string): string {
    return StatusUtil.convert(status);
  }

  isManager(): boolean {
    return SecurityUtil.isInRole('manager');
  }

}

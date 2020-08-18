import { ComponentsModule } from 'src/app/components/components.module';
import { ManagerGuard } from './guards/manager.guard';
import { FramelessPage } from './pages/shared/frameless/frameless.page';
import { FramePage } from './pages/shared/frame/frame.page';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedGuard } from './guards/authorized.guard';

@NgModule({
  declarations: [
    AppComponent,
    FramePage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthorizedGuard,
    ManagerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

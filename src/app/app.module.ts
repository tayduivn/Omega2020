import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AnimateItemsDirective } from './directives/animate-items.directive';
import { from } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DetallesForumPageModule } from './pages/detalles-forum/detalles-forum.module';
import { DetallesChatPage } from './pages/detalles-chat/detalles-chat.page';
import { DetallesChatPageModule } from './pages/detalles-chat/detalles-chat.module';
import { DetallesNewsPageModule } from './pages/detalles-news/detalles-news.module';
import { DetallesNewsPage } from './pages/detalles-news/detalles-news.page';

import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';








@NgModule({
  declarations: [AppComponent, AnimateItemsDirective],
  entryComponents: [DetallesNewsPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({mode:'ios', scrollPadding:false,scrollAssist:true}),
    HttpClientModule,
    ReactiveFormsModule,
    DetallesForumPageModule,
    DetallesChatPageModule,
    DetallesNewsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileOpener,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

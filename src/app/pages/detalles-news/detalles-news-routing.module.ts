import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesNewsPage } from './detalles-news.page';

/*const routes: Routes = [
  {
    path: '',
    component: DetallesNewsPage
  }
];*/

@NgModule({
 // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesNewsPageRoutingModule {}

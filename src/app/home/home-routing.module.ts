import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'solicitar',
    loadChildren: () => import('../solicitar/solicitar.module').then( m => m.SolicitarPageModule)
  },
  {
    path: 'solicitar/:dni',
    loadChildren: () => import('../solicitar/solicitar.module').then( m => m.SolicitarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

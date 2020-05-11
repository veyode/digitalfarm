import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then(module => module.AccountModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(module => module.AuthModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
      //scrollPositionRestoration: 'enabled',
      //anchorScrolling: 'enabled',
      //scrollOffset: [0, 64] // [x, y]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

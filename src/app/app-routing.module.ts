import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'productlist',
    loadChildren: () => import('./productlist/productlist.module').then(m => m.ProductlistPageModule),
    data: { preload: true }
  },
  {
    path: 'pdetail',
    loadChildren: () => import('./pdetail/pdetail.module').then(m => m.PdetailPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      enableTracing: false
    })
  ],
  providers: [CustomPreloadingStrategy],
  exports: [RouterModule]
})
export class AppRoutingModule { }

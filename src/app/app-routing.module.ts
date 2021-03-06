import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
    
  },
  // {
  //   path: 'landing',
  //   loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] 
  },
  { 
    path: 'list', 
    loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] 
  },
  {
    path: 'tabs-admin',
    loadChildren: () => import('./tabs-admin/tabs-admin.module').then( m => m.TabsAdminPageModule)
  },
  {
    path: 'article/:id',
    loadChildren: () => import('./pages/article/article.module').then( m => m.ArticlePageModule)
  },
  {
    path: 'offer/:id',
    loadChildren: () => import('./pages/offer/offer.module').then( m => m.OfferPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

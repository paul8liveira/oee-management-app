import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    {
      path: '',
      component: LoginComponent
    },
            
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: '**',
      redirectTo: 'home'
    },    
  ];

  export const Routing = RouterModule.forRoot(appRoutes);
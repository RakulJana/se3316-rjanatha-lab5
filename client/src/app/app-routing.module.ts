import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component'
import { LogoutComponent } from './logout/logout.component'
import { NewsongComponent } from './newsong/newsong.component'
import { NewsongmoreComponent } from './newsongmore/newsongmore.component'
import { SitemanagerComponent } from './sitemanager/sitemanager.component'
import { ViewdmcaComponent } from './viewdmca/viewdmca.component';


const routes: Routes = [
  { path: '', component: HomeComponent}, // '' because it is the default route that should be loaded
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'newsong', component: NewsongComponent },
  { path: 'newsongmore', component: NewsongmoreComponent},
  { path: 'sitemanager', component: SitemanagerComponent},
  { path: 'viewdmca', component: ViewdmcaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

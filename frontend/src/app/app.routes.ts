import {Routes} from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {Projects} from './pages/projects/projects';
import {Resources} from './pages/resources/resources';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'projects',
    component: Projects
  },
  {
    path: 'resources',
    component: Resources
  }
];

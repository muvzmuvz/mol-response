import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
    {
        path:'',
        component: HomePage
    },
    {
        path: 'history',
        loadComponent: () => import('./pages/history-page/history-page').then(m => m.HistoryPage)
    }
];

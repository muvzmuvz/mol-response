import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { HistoryPage } from './pages/history-page/history-page';

export const routes: Routes = [
    {
        path:'',
        component: HomePage
    },
    {
        path: 'history',
        component: HistoryPage
    }
];

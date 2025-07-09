import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, CommonModule } from '@angular/common';

import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import {
  TuiInputDateRange,
  TuiCalendarRange,
} from '@taiga-ui/kit';
import {
  TuiStatus,
} from '@taiga-ui/kit';
import {
  TuiTable
} from '@taiga-ui/addon-table';
import { TuiTextfield } from '@taiga-ui/core';
import { HistoryService } from '../../service/historyService/history-service';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    CommonModule,
    TuiTable,
    TuiStatus,
    TuiTextfield,
    TuiInputDateRange,
    TuiCalendarRange,
    Navbar,
  ],
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.less'],
})
export class HistoryPage implements OnInit {
  constructor(private historyService: HistoryService) { }

  search = '';
  data: any[] = [];
  routeOptions: { id: string; name: string }[] = [];

  size: 's' | 'm' | 'l' = 'm';
  route = 'all';

  // Начальные даты в формате Date
  dateRange = {
    from: '2025-01-01', // теперь строки для работы с input[type="date"]
    to: new Date().toISOString().split('T')[0], // текущая дата в формате 'yyyy-mm-dd'
  };

  minDateString = '2023-01-01';
  maxDateString = new Date().toISOString().split('T')[0];

  minDate = new TuiDay(2023, 0, 1);
  maxDate = TuiDay.currentLocal();

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.getAll().subscribe((clients) => {
      const allHistory = [];

      for (const client of clients) {
        const routeTitle = client.route?.title || 'Без маршрута';

        for (const entry of client.history) {
          allHistory.push({
            routeTitle,
            organization: client.organization,
            name: client.name,
            phone: client.phone,
            status: entry.status,
            date: entry.date,
          });
        }
      }

      this.data = allHistory;

      const routeNames = Array.from(
        new Set(
          this.data.map((d) => d.routeTitle?.split('-')[0]).filter(Boolean)
        )
      );

      this.routeOptions = [
        { id: 'all', name: 'Все маршруты' },
        ...routeNames.map((n) => ({ id: n, name: n })),
      ];
    });
  }

  get filteredData() {
    const searchTerm = this.search.toLowerCase().trim();

    // Преобразуем строки в объекты Date для корректного сравнения
    const fromDate = this.dateRange.from ? new Date(this.dateRange.from) : null;
    const toDate = this.dateRange.to ? new Date(this.dateRange.to) : null;

    return this.data.filter((item) => {
      const routeMatch =
        this.route === 'all' ||
        item.routeTitle.toLowerCase().startsWith(this.route.toLowerCase());

      const date = new Date(item.date);
      const dateMatch =
        (!fromDate || date >= fromDate) &&
        (!toDate || date <= toDate);

      const searchMatch =
        !searchTerm ||
        item.routeTitle.toLowerCase().includes(searchTerm) ||
        item.organization.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.phone.toLowerCase().includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm);

      return routeMatch && dateMatch && searchMatch;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Выполнено':
        return 'var(--tui-status-positive)';
      case 'Не выполнено':
        return 'var(--tui-status-negative)';
      default:
        return 'var(--tui-status-warning)';
    }
  }
}

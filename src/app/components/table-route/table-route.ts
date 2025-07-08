import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {
  TuiAutoColorPipe,
  TuiButton,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
  TuiLink,
  TuiTitle,
  tuiItemsHandlersProvider,
    TuiTextfield,
  TuiLabel, // Добавлен TuiLabel
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
 // Добавлен TuiTextfield
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { TuiTable, TuiTableFilters } from '@taiga-ui/addon-table';
import { FormsModule } from '@angular/forms';

interface RouteOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-table-route',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTableFilters,
    TuiTitle,
    FormsModule,
    TuiLabel, // добавлен
    TuiTextfield, // добавлен
  ],
  templateUrl: './table-route.html',
  styleUrl: './table-route.less',
  providers: [
    tuiItemsHandlersProvider<RouteOption>({
      stringify: signal((item) => item.name),
      identityMatcher: signal((a, b) => a.id === b.id),
    }),
  ],
})
export class TableRoute {
  protected readonly sizes = ['l', 'm', 's'] as const;
  protected size = this.sizes[0];
  
  // Свойство для поиска
  protected search = '';

  protected readonly form = new FormGroup({
    route: new FormControl<string>('all'),
  });

  get routeControl(): FormControl<string> {
    return this.form.get('route') as FormControl<string>;
  }

  protected readonly data = [
    {
      id: 1,
      checkbox: { title: 'Саки-4' },
      title: {
        icon: '@tui.file',
        title: 'ИП Басова',
        subtitle: 'Дополнительная информация ・ Данные',
      },
      cell: {
        phone: '+7 (999) 123-45-67',
        name: 'Светлана Басова',
        email: 'silly@walk.uk',
      },
      status: {
        value: 'Выполнено',
        color: 'var(--tui-status-positive)',
      },
      selected: false,
    },
    {
      id: 2,
      checkbox: { title: 'Саки-3', subtitle: 'Некоторый дополнительный текст' },
      title: {
        icon: '@tui.heart',
        title: 'ИП Петров',
        chip: 'Чипы могут быть здесь',
      },
      cell: {
        phone: '+7 (999) 987-65-43',
        name: 'Петр Петров',
        email: 'cool@dude.com',
      },
      status: {
        value: 'Не выполнено',
        color: 'var(--tui-status-negative)',
      },
      selected: false,
    },
    {
      id: 3,
      checkbox: { title: 'Евпатория-2' },
      title: { title: 'ИП Петров' },
      cell: {
        name: 'Петр Петров',
        email: 'cool@dude.com',
        phone: '+7 (999) 987-65-43',
      },
      status: {
        value: 'В процессе',
        color: 'var(--tui-status-warning)',
      },
      selected: false,
    },
    {
      id: 4,
      checkbox: { title: 'Севастополь-1' },
      title: { title: 'ИП Иванов' },
      cell: {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 555-44-33',
      },
      status: {
        value: 'Выполнено',
        color: 'var(--tui-status-positive)',
      },
      selected: false,
    },
  ];

  protected routeOptions: RouteOption[] = [];

  constructor() {
    const routes = this.data
      .map((item) => item.checkbox.title.split('-')[0])
      .filter(Boolean);
      
    const uniqueRoutes = Array.from(new Set(routes));
    
    this.routeOptions = [
      { id: 'all', name: 'Все маршруты' },
      ...uniqueRoutes.map(name => ({ id: name, name }))
    ];
  }

  protected get filteredData() {
    const selectedRouteId = this.routeControl.value;
    const searchTerm = this.search ? this.search.toLowerCase().trim() : '';

    // Фильтрация по маршруту
    let filtered = this.data;
    if (selectedRouteId !== 'all') {
      filtered = filtered.filter(item => 
        item.checkbox.title.toLowerCase().startsWith(selectedRouteId.toLowerCase())
      );
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(item => 
        this.isMatch(item.checkbox.title, searchTerm) ||
        this.isMatch(item.title.title, searchTerm) ||
        this.isMatch(item.cell.name, searchTerm) ||
        this.isMatch(item.cell.phone, searchTerm) ||
        this.isMatch(item.status.value, searchTerm)
      );
    }

    return filtered;
  }

  // Проверяет, содержит ли строка искомый термин
  private isMatch(value: string | undefined, searchTerm: string): boolean {
    return value?.toLowerCase().includes(searchTerm) ?? false;
  }

  protected get checked(): boolean | null {
    const every = this.data.every(({ selected }) => selected);
    const some = this.data.some(({ selected }) => selected);
    return every || (some && null);
  }

  protected onCheck(checked: boolean): void {
    this.data.forEach(item => {
      item.selected = checked;
    });
  }
}
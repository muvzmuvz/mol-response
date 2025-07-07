import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { TuiTable } from '@taiga-ui/addon-table';

interface RouteOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-table-route',
  standalone: true,
  imports: [
    FormsModule,
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
    TuiTitle,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
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

  // ЗАМЕНА: используем обычное свойство вместо сигнала
  protected selectedRoute: RouteOption = { id: 'all', name: 'Все маршруты' };

  protected readonly data = [
    {
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
      checkbox: { title: 'Саки-2' },
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
  ];

  protected get routeOptions(): RouteOption[] {
    const routes = this.data
      .map((item) => item.checkbox.title.split('-')[0])
      .filter(Boolean);

    const unique = Array.from(new Set(routes));
    return [{ id: 'all', name: 'Все маршруты' }, ...unique.map((name) => ({ id: name, name }))];
  }

  // ОБНОВЛЕННЫЙ МЕТОД: работаем с обычным свойством
  protected get filteredData() {
    if (!this.selectedRoute || this.selectedRoute.id === 'all') {
      return this.data;
    }

    return this.data.filter((item) =>
      item.checkbox.title.toLowerCase().startsWith(this.selectedRoute.id.toLowerCase())
    );
  }

  protected get checked(): boolean | null {
    const every = this.data.every(({ selected }) => selected);
    const some = this.data.some(({ selected }) => selected);
    return every || (some && null);
  }

  protected onCheck(checked: boolean): void {
    this.data.forEach((item) => {
      item.selected = checked;
    });
  }
}
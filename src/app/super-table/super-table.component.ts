import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface HeaderInterface {
  title: string;
  children: HeaderInterface[];
  colSpan: number;
  rowSpan: number;
  link: LinkInterface;
  remove?: boolean;
}

class Header implements HeaderInterface {
  title = '';
  children = [];
  colSpan = 1;
  rowSpan = 1;
  link = new Link() as LinkInterface;
}

interface ConfigInterface {
  headers: HeaderInterface[];
  data: [];
}

interface LinkInterface {
  remove?: boolean;
  title: string;
  children: LinkInterface[];
}

class Link implements LinkInterface {
  title = '';
  children = [];
}

@Component({
  selector: 'app-super-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './super-table.component.html',
  styleUrl: './super-table.component.scss',
})
export class SuperTableComponent {
  public table = [];
  public thead: HeaderInterface[][] = [];

  public deleteSelf(header: LinkInterface) {
    header.remove = true;
    this.buildTable();
  }

  public delete(header: LinkInterface) {
    header.children = [];
    this.buildTable();
  }

  ngOnInit() {
    this.buildTable();
  }

  public get data_set() {
    let data = [];
    let count = this.countLastLevelChildren(this.config);
    for (let i = 0; i < count; i++) data.push({});
    return data;
  }

  public addRow(where: string = 'after') {
    if (where === 'after') this.config.push({ title: '', children: [] });
    if (where === 'before') this.config.unshift({ title: '', children: [] });

    this.buildTable();
  }

  public addKid(header: LinkInterface) {
    const hd = new Header();

    if (hd.children === undefined) hd.children = [];
    try {
      header.children.push(hd);
    } catch (e) {
      header.children = [];
      header.children.push(hd);
    }
    this.buildTable();
  }
  public buildTable() {
    this.thead = [];
    this.createHeaders(this.config as HeaderInterface[], 0, 0);
  }

  // Function to create header rows
  public createHeaders(headers: HeaderInterface[], row: number, level: number) {
    if (!this.thead[row]) {
      this.thead.push([]);
    }
    headers.forEach((header) => {
      if (header.remove) return;
      const th = new Header();
      th.title = header.title;
      th.link = header as LinkInterface;
      if (header.children && header.children.length > 0) {
        th.colSpan = this.getColSpan(header);
        this.thead[row].push(th);
        this.createHeaders(header.children, row + 1, level + 1);
      } else {
        th.rowSpan = this.getRowSpan(headers, level);
        this.thead[row].push(th);
      }
    });
  }

  // Function to calculate column span
  public getColSpan(header: HeaderInterface): number {
    if (!header.children || header.children.length === 0) {
      return 1;
    }
    return header.children.reduce(
      (colSpan, child) => colSpan + this.getColSpan(child),
      0
    );
  }

  // Function to calculate row span
  public getRowSpan(headers: HeaderInterface[], level: number): number {
    const maxLevel = Math.max(
      ...headers.map((header) => this.getLevel(header))
    );
    return maxLevel + level + 1;
  }

  // Function to get the level of a header
  public getLevel(header: HeaderInterface): number {
    if (!header.children || header.children.length === 0) {
      return 1;
    }
    return (
      1 + Math.max(...header.children.map((child) => this.getLevel(child)))
    );
  }

  public countLastLevelChildren = (nodes: LinkInterface[]): number => {
    let count = 0;

    const traverse = (node: LinkInterface) => {
      if (!node.children || node.children.length === 0) {
        count++;
      } else {
        node.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
    return count;
  };

  public config2 = [
    {
      title: 'Заголовок',
      children: [{ title: 'Подзаголвок' }, { title: 'Подзаголвок' }],
    } as Header,
    { title: 'Заголовок' } as Header,
    { title: 'Заголовок' } as Header,
  ];

  public config: LinkInterface[] = [];

  public config_FULL: LinkInterface[] = [
    {
      title: 'Name',
      children: [],
    },
    {
      title: 'Other',
      children: [
        {
          title: 'age data',
          children: [
            {
              title: 'birthdate',
              children: [
                {
                  title: 'day',
                  children: [],
                },
                {
                  title: 'month',
                  children: [],
                },
                {
                  title: 'year',
                  children: [],
                },
              ],
            },
            {
              title: 'age',
              children: [],
            },
          ],
        },
        {
          title: 'address',
          children: [
            {
              title: 'Street',
              children: [],
            },
            {
              title: 'block',
              children: [
                {
                  title: 'Building',
                  children: [],
                },
                {
                  title: 'Door no.',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Company',
      children: [
        {
          title: 'Company address',
          children: [
            { title: 'country', children: [] },
            { title: 'city', children: [] },
          ],
        },
        {
          title: 'Company name',
          children: [],
        },
        {
          title: 'Company rating',
          children: [
            { title: 'Last year', children: [] },
            { title: 'This year', children: [] },
          ],
        },
      ],
    },
    {
      title: 'Gender',
      children: [],
    },
  ];

  public json = {
    headers: [
      {
        title: 'Заголовок',
        children: [{ title: 'Подзаголвок' }, { title: 'Подзаголвок' }],
      },
      { title: 'Заголовок' },
      { title: 'Заголовок' },
    ],
    data: [],
  };

  json_was = {
    headers: [
      {
        title: 'Name',
      },
      {
        title: 'Other',
        children: [
          {
            title: 'age data',
            children: [
              {
                title: 'birthdate',
                children: [
                  {
                    title: 'day',
                  },
                  {
                    title: 'month',
                  },
                  {
                    title: 'year',
                  },
                ],
              },
              {
                title: 'age',
              },
            ],
          },
          {
            title: 'address',
            children: [
              {
                title: 'Street',
              },
              {
                title: 'block',
                children: [
                  {
                    title: 'Building',
                  },
                  {
                    title: 'Door no.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Company',
        children: [
          {
            title: 'Company address',
            children: [{ title: 'country' }, { title: 'city' }],
          },
          {
            title: 'Company name',
          },
          {
            title: 'Company rating',
            children: [{ title: 'Last year' }, { title: 'This year' }],
          },
        ],
      },
      {
        title: 'Gender',
      },
    ],
    data: [
      [
        'Daniel',
        '22',
        '03',
        '2001',
        '21',
        'Zastavskaya',
        '46',
        '423',
        'Russia',
        'Moscow',
        'RosPotrebNadzor',
        '4.5',
        '4.6',
        'Male',
      ],
    ],
  };
}

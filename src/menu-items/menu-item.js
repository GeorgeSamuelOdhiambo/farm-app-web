import { IconKey, IconBook, IconFridge, IconDashboard, IconWallet, IconCreditCard } from '@tabler/icons-react';

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: IconDashboard,
      breadcrumbs: false
    }
  ]
};

const utilities = {
  id: 'utilities',
  title: 'Record Keeping',
  type: 'group',
  children: [
    {
      id: 'Flock_Management',
      title: 'Flock Management',
      type: 'collapse',
      icon: IconBook,
      children: [
        {
          id: 'View-Records',
          title: 'View Records',
          type: 'item',
          url: '/utils/util-view-records',
          breadcrumbs: false
        },
        {
          id: 'FM_Vaccination',
          title: 'Vaccination',
          type: 'item',
          url: '/utils/util-vaccination',
          breadcrumbs: false
        },
        {
          id: 'FM_Feeding',
          title: 'Feeding',
          type: 'item',
          url: '/utils/util-feeding',
          breadcrumbs: false
        },
        {
          id: 'FM_Health_Mortality',
          title: 'Health & Mortality',
          type: 'item',
          url: '/utils/util-health-mortality',
          breadcrumbs: false
        },
        {
          id: 'FM_Productivity',
          title: 'Productivity',
          type: 'item',
          url: '/utils/util-productivity',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'util-incubation',
      title: 'Incubation',
      type: 'item',
      url: '/utils/util-color',
      icon: IconFridge,
      breadcrumbs: false
    }
  ]
};

const finance = {
  id: 'manage_finance',
  title: 'Manage Finance',
  type: 'group',
  children: [
    {
      id: 'incomes',
      title: 'My Incomes',
      type: 'collapse',
      icon: IconWallet,
      children: [
        {
          id: 'incomes',
          title: 'Over View',
          type: 'item',
          url: '/finance/finance-shadow',
          breadcrumbs: false
        },
        {
          id: 'sales',
          title: 'My Income',
          type: 'item',
          url: '/finance/finance-income',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'expenses',
      title: 'My Expenses',
      type: 'collapse',
      icon: IconCreditCard,
      children: [
        {
          id: 'expenses',
          title: 'Over View',
          type: 'item',
          url: '/finance/finance-exp-landing-page',
          breadcrumbs: false
        },
        {
          id: 'vaccination_expenses',
          title: 'Vaccination',
          type: 'item',
          url: '/finance/finance-vaccination',
          breadcrumbs: false
        },
        {
          id: 'feeding_expenses',
          title: 'Feeding',
          type: 'item',
          url: '/finance/finance-feeding',
          breadcrumbs: false
        },
        {
          id: 'other_expenses',
          title: 'Other Expenses',
          type: 'item',
          url: '/finance/finance-others',
          breadcrumbs: false
        },
        {
          id: 'general_expenses',
          title: 'General Expenses',
          type: 'item',
          url: '/finance/finance-general',
          breadcrumbs: false
        }
      ]
    }
  ]
};

const pages = {
  id: 'pages',
  title: 'Pages',
  //   caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    }
  ]
};

export { dashboard, pages, utilities, finance };

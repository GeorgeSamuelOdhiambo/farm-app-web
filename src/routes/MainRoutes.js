import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const FeedingData = Loadable(lazy(() => import('views/utilities/FeedData')));
const UtilsIncubation = Loadable(lazy(() => import('views/utilities/Incubation')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const HealthRecord = Loadable(lazy(() => import('views/utilities/HealthAndMortality')));
const ProductivityRecord = Loadable(lazy(() => import('views/utilities/Productivity')));
const ViewFlockRecords = Loadable(lazy(() => import('views/utilities/ViewFlockRecords')));
const IncomeRecord = Loadable(lazy(() => import('views/finance/IncomeData')));
const VaccinationExpensesRecord = Loadable(lazy(() => import('views/finance/VaccinationExpensesData')));
const FeedsExpensesRecord = Loadable(lazy(() => import('views/finance/FeedsExpensesData')));
const OtherExpensesRecord = Loadable(lazy(() => import('views/finance/OtherExpensesData')));
const IncomeLandingPage = Loadable(lazy(() => import('views/finance/MainIncomeData')));
const ExpensesLandingPage = Loadable(lazy(() => import('views/finance/MainExpensesData')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-view-records',
          element: <ViewFlockRecords />
        },
        {
          path: 'util-color',
          element: <UtilsIncubation />
        },
        {
          path: 'util-feeding',
          element: <FeedingData />
        },
        {
          path: 'util-vaccination',
          element: <UtilsTypography />
        },
        {
          path: 'util-health-mortality',
          element: <HealthRecord />
        },
        {
          path: 'util-productivity',
          element: <ProductivityRecord />
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'finance',
      children: [
        {
          path: 'finance-others',
          element: <OtherExpensesRecord />
        },
        {
          path: 'finance-feeding',
          element: <FeedsExpensesRecord />
        },
        {
          path: 'finance-vaccination',
          element: <VaccinationExpensesRecord />
        },
        {
          path: 'finance-income',
          element: <IncomeRecord />
        },
        {
          path: 'finance-health-mortality',
          element: <HealthRecord />
        },
        {
          path: 'finance-productivity',
          element: <ProductivityRecord />
        },
        {
          path: 'finance-shadow',
          element: <IncomeLandingPage />
        },
        {
          path: 'finance-exp-landing-page',
          element: <ExpensesLandingPage />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        },
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;

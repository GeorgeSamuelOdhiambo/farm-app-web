// ===========================|| DASHBOARD - TOTAL ORDER MONTH CHART ||=========================== //

const chartData = (data) => {
  return {
    type: 'line',
    height: 90,
    options: {
      chart: {
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#fff'],
      fill: {
        type: 'solid',
        opacity: 1
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      yaxis: {
        min: 0,
        max: 100
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: 'Total Order'
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      {
        name: 'Ksh',
        data: data
      }
    ]
  };
};

export default chartData;

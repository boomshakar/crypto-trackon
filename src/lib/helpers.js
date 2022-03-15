import ChartJsImage from 'chartjs-to-image';
import Colour from './color';
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const profitLoss = (price) => {
  if (price >= 0.5) {
    return Colour.GreendWrite;
  } else if (price >= 0.15) {
    return Colour.GreendWrite;
  } else if (price >= 0.05) {
    return Colour.BlueWrite;
  } else if (price >= 0.0) {
    return Colour.PurpleWrite;
  } else if (price >= -0.09) {
    return Colour.PinkWrite;
  } else if (price < -0.09) {
    return Colour.RedWrite;
  }
};

export const getChartUri = (data, bdColor) => {
  let key = Array.from(data.keys());
  let value = Array.from(data.values());
  const myChart = new ChartJsImage();
  myChart.setConfig({
    type: 'line',
    data: {
      labels: key,
      datasets: [
        {
          data: value,
          fill: false,
          backgroundColor: 'transparent',
          // backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: bdColor,
          borderWidth: 5,
          pointRadius: 0,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  });
  myChart.setWidth(1200).setHeight(150).setBackgroundColor('transparent');
  // console.log(myChart.getUrl());
  // return 'Hello';
  return (
    <img
      src={myChart.getUrl()}
      alt={''}
      height="18"
      style={{
        margin: '0',
        padding: '0',
      }}
    />
  );
  // return myChart.getUrl();
};

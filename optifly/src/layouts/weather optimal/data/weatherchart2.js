import React, { useState, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const params = {
      latitude: 52.52,
      longitude: 13.41,
      hourly: ["temperature_2m", "visibility"]
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    fetchWeatherApi(url, params)
      .then(responses => {
        const range = (start, stop, step) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly();

        const weatherData = {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000).toISOString()
          ),
          temperature2m: hourly.variables(0).valuesArray(),
          visibility: hourly.variables(1).valuesArray(),
        };

        setWeatherData(weatherData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const formattedLabels = weatherData.time.map(time => moment(time).format('DD-MMM'));

  const data = {
    labels: weatherData.time,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.temperature2m,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverRadius: 10,
        pointRadius: 0,
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Visibility (km)',
        data: weatherData.visibility.map(value => value / 1000),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        pointBackgroundColor: 'rgba(153,102,255,1)',
        pointHoverRadius: 10,
        pointRadius: 0,
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const options = {
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: function (context) {
            const date = moment(context[0].label).format('dddd, D MMM, HH:mm');
            return date;
          },
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw.toFixed(2);
            return label;
          }
        }
      },
      crosshair: {
        line: {
          color: 'blue',
          width: 1
        },
        sync: {
          enabled: false
        },
        zoom: {
          enabled: false
        },
        callbacks: {
          afterDraw: (chart) => {
            const ctx = chart.ctx;
            if (activeIndex !== null) {
              const x = chart.scales.x.getPixelForValue(data.labels[activeIndex]);
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, chart.chartArea.top);
              ctx.lineTo(x, chart.chartArea.bottom);
              ctx.lineWidth = 1;
              ctx.strokeStyle = 'red';
              ctx.stroke();
              ctx.restore();

              ctx.font = '12px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText(`Temp: ${data.datasets[0].data[activeIndex]}°C`, x + 5, chart.chartArea.top + 15);
              ctx.fillText(`Vis: ${data.datasets[1].data[activeIndex]}km`, x + 5, chart.chartArea.top + 30);
            }
          }
        }
      }
    },
    scales: {
      'y-axis-1': {
        type: 'linear',
        position: 'left',
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: function(value) {
            return value + ' °C'; // Adjust the format as needed
          }
        },
      },
      'y-axis-2': {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return (value).toFixed(0) + 'K m'; // Format as needed
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          
          callback: function (value, index, values) {
            const uniqueLabels = formattedLabels.filter((label, idx) => {
              return formattedLabels.indexOf(label) === idx;
            });
            if (index % 24 === 0 || index === values.length - 1) {
              return moment(weatherData.time[index]).format('DD-MMM');
            }
            return '';
          },
        },
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        setActiveIndex(chartElement[0].index);
      }
    }
  };

  return (
    <div>
      <h1>Weather Data Chart</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;

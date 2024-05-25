import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import 'chart.js/auto';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

const WeatherChart = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                latitude: 77.59,
                longitude: 12.97,
                start_date: "2024-05-15",
                end_date: "2024-05-23",
                hourly: "temperature_2m"
            };
            const url = "https://archive-api.open-meteo.com/v1/archive";
            const response = await fetch(`${url}?${new URLSearchParams(params)}`);
            const data = await response.json();

            if (data && data.hourly && data.hourly.temperature_2m) {
                const weatherData = {
                    hourly: {
                        time: data.hourly.time.map(t => new Date(t)),
                        temperature2m: data.hourly.temperature_2m,
                    },
                };

                setWeatherData(weatherData);
            }
        };

        fetchData();
    }, []);

    if (!weatherData) {
        return <ArgonTypography>Loading...</ArgonTypography>;
    }

    const data = {
        labels: weatherData.hourly.time.map(date => format(date, 'dd MMMM')), // Format date as "dd Month name"
        datasets: [
            {
                label: 'Temperature at 2m',
                data: weatherData.hourly.temperature2m,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Set to false to allow customizing width and height
        scales: {
            x: {
                grid: {
                    display: false,
                    color: '#ccc'
                },
                ticks: {
                    color: '#666'
                }
            },
            y: {
                grid: {
                    display: true,
                    color: '#ccc'
                },
                ticks: {
                    color: '#666'
                }
            }
        },
        plugins: {
            crosshair: {
                line: {
                    color: '#000000', // crosshair line color changed to black
                    width: 1 // crosshair line width
                },
                
                callbacks: {
                    afterDraw: function (chart) {
                        const tooltip = chart.tooltip;
                        if (tooltip._active && tooltip._active.length) {
                            const activePoint = tooltip._active[0];
                            const ctx = chart.ctx;
                            const x = activePoint.element.x;
                            const topY = chart.scales.y.top;
                            const bottomY = chart.scales.y.bottom;

                            // draw the vertical line
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(x, topY);
                            ctx.lineTo(x, bottomY);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = 'rgba(0,0,0,1)'; // change vertical line color to black
                            ctx.stroke();
                            ctx.restore();
                        }
                    }
                }
            },
            legend: {
                labels: {
                    color: '#666'
                }
            },
            tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw.toFixed(1); // format value to one decimal place
                        return `${label}: ${value}°C`;
                    }
                }
            }
        }
    };

    return (
        <ArgonBox>
            <ArgonBox >
                <ArgonTypography variant="h4">Weather Data</ArgonTypography>
                <ArgonBox>
                    <Line data={data} options={options} plugins={[CrosshairPlugin]} height={400} width={800} />
                </ArgonBox>
            </ArgonBox>
        </ArgonBox>
    );
};

export default WeatherChart;
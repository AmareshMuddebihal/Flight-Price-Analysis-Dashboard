import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { FlightData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartSectionProps {
  data: FlightData[];
}

const chartColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(153, 102, 255, 0.8)',
];

export function ChartSection({ data }: ChartSectionProps) {
  const labels = data.map((f) => `${f.Source} → ${f.Destination} (${f.Route})`);
  const prices = data.map((f) => f.Price);
  const durations = data.map((f) => {
    const parts = f.Duration.match(/(\d+)h(?:\s(\d+)m)?/);
    return parts ? parseInt(parts[1]) * 60 + (parts[2] ? parseInt(parts[2]) : 0) : 0;
  });
  const stops = data.map((f) => f.Total_Stops === 'non-stop' ? 0 : parseInt(f.Total_Stops));

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="grid grid-cols-1 gap-8 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Flight Prices</h3>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: 'Price',
                data: prices,
                backgroundColor: chartColors,
              },
            ],
          }}
          options={commonOptions}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Flight Durations (minutes)</h3>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: 'Duration',
                data: durations,
                borderColor: chartColors[0],
                tension: 0.1,
              },
            ],
          }}
          options={commonOptions}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Total Stops</h3>
        <Pie
          data={{
            labels,
            datasets: [
              {
                data: stops,
                backgroundColor: chartColors,
              },
            ],
          }}
          options={commonOptions}
        />
      </div>
    </div>
  );
}
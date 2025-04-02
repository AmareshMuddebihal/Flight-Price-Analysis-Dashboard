import React, { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';
import { FilterSection } from './components/FilterSection';
import { ChartSection } from './components/ChartSection';
import { FlightData, FilterState } from './types';

function App() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [filteredData, setFilteredData] = useState<FlightData[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    airline: 'ALL',
    source: 'ALL',
    destination: 'ALL',
    date: 'ALL',
    time: 'ALL',
  });

  const [options, setOptions] = useState<Record<keyof FilterState, Set<string>>>({
    airline: new Set(['ALL']),
    source: new Set(['ALL']),
    destination: new Set(['ALL']),
    date: new Set(['ALL']),
    time: new Set(['ALL']),
  });

  useEffect(() => {
    fetch('/new/output.json')
      .then((response) => response.json())
      .then((data: FlightData[]) => {
        setFlightData(data);
        
        // Populate filter options
        const newOptions = {
          airline: new Set(['ALL']),
          source: new Set(['ALL']),
          destination: new Set(['ALL']),
          date: new Set(['ALL']),
          time: new Set(['ALL']),
        };

        data.forEach((flight) => {
          newOptions.airline.add(flight.Airline);
          newOptions.source.add(flight.Source);
          newOptions.destination.add(flight.Destination);
          newOptions.date.add(flight.Date_of_Journey);
          newOptions.time.add(flight.Dep_Time);
        });

        setOptions(newOptions);
      })
      .catch((error) => console.error('Error loading flight data:', error));
  }, []);

  useEffect(() => {
    const filtered = flightData.filter((flight) => {
      return (
        (filters.airline === 'ALL' || flight.Airline === filters.airline) &&
        (filters.source === 'ALL' || flight.Source === filters.source) &&
        (filters.destination === 'ALL' || flight.Destination === filters.destination) &&
        (filters.date === 'ALL' || flight.Date_of_Journey === filters.date) &&
        (filters.time === 'ALL' || flight.Dep_Time === filters.time)
      );
    });
    setFilteredData(filtered);
  }, [flightData, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Plane className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Flight Price Analysis Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <FilterSection
          filters={filters}
          options={options}
          onFilterChange={handleFilterChange}
        />
        
        {filteredData.length > 0 ? (
          <ChartSection data={filteredData} />
        ) : (
          <div className="mt-8 text-center text-gray-500">
            No flights found matching the selected criteria
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
export interface FlightData {
  Airline: string;
  Date_of_Journey: string;
  Source: string;
  Destination: string;
  Route: string;
  Dep_Time: string;
  Arrival_Time: string;
  Duration: string;
  Total_Stops: string;
  Additional_Info: string;
  Price: number;
}

export interface FilterState {
  airline: string;
  source: string;
  destination: string;
  date: string;
  time: string;
}
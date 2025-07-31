// pages/api/buses.ts
import { NextApiRequest, NextApiResponse } from 'next';

const buses = [
  {
    id: 'bus1',
    name: 'Línea A',
    stops: ['Terminal Norte', 'Estación Central', 'Paradero 5', 'Destino Final'],
    schedule: ['06:00', '07:00', '08:00', '09:00', '10:00'],
  },
  {
    id: 'bus2',
    name: 'Línea B',
    stops: ['Terminal Sur', 'Parque Central', 'Plaza Mayor', 'Destino Final'],
    schedule: ['06:30', '07:30', '08:30', '09:30', '10:30'],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(buses);
}

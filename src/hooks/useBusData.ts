import { useEffect, useState } from 'react';

interface BusData {
  id: string;
  name: string;
  stops: string[];
  schedule: string[];
}

export default function useBusData() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch('/api/buses'); 
        const data = await res.json();
        setBusData(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar buses');
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  return { busData, loading, error };
}

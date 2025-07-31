import { useEffect, useState } from 'react';
import xml2js from 'xml2js';

export interface Agency {
  tag: string;
  title: string;
}

export function useAgencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await fetch('https://webservices.nextbus.com/service/publicXMLFeed?command=agencyList');
        const xml = await res.text();
        const json = await xml2js.parseStringPromise(xml);
        const list = json.body.agency.map((a: any) => ({
          tag: a.$.tag,
          title: a.$.title,
        }));
        setAgencies(list);
      } catch (err) {
        console.error('Error cargando agencias', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  return { agencies, loading };
}

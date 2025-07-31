import { useEffect, useState } from 'react';
import xml2js from 'xml2js';

export interface Stop {
  tag: string;
  title: string;
  stopId: string;
}

export interface Route {
  tag: string;
  title: string;
  stops: Stop[];
}

export function useRoutes(agency: string) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agency) return;

    const fetchRoutes = async () => {
      try {
        const res = await fetch(`https://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=${agency}`);
        const xml = await res.text();
        const json = await xml2js.parseStringPromise(xml);
        const routeList = json.body.route.map((r: any) => ({
          tag: r.$.tag,
          title: r.$.title,
          stops: r.stop.map((s: any) => ({
            tag: s.$.tag,
            title: s.$.title,
            stopId: s.$.stopId,
          })),
        }));
        setRoutes(routeList);
      } catch (err) {
        console.error('Error cargando rutas', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [agency]);

  return { routes, loading };
}

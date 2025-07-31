import { createContext, useContext, useState, ReactNode } from 'react';

interface ScheduleItem {
  day: string;
  time: string;
}

interface BusContextType {
  selectedBusId: string;
  setSelectedBusId: (id: string) => void;
  selectedStop: string;
  setSelectedStop: (stop: string) => void;
  schedule: ScheduleItem[];
  addSchedule: (item: ScheduleItem) => void;
}

const BusContext = createContext<BusContextType | undefined>(undefined);

export const useBusContext = () => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error('useBusContext must be used within BusProvider');
  }
  return context;
};

export const BusProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBusId, setSelectedBusId] = useState<string>('');
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const addSchedule = (item: ScheduleItem) => {
    setSchedule((prev) => [...prev, item]);
  };

  return (
    <BusContext.Provider
      value={{
        selectedBusId,
        setSelectedBusId,
        selectedStop,
        setSelectedStop,
        schedule,
        addSchedule,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

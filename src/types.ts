export interface Contact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
  lastCall: string;
}

export interface NavigationButton {
  icon: React.ElementType;
  text: string;
  onClick: () => void;
  color: string;
  badge?: number;
  pulse?: boolean;
}

export interface HealthData {
  medications: Array<{
    id: number;
    name: string;
    schedule: string;
    taken: boolean;
  }>;
  appointments: Array<{
    id: number;
    title: string;
    date: string;
    time: string;
  }>;
}
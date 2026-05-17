export type Zone = "all" | "inner" | "outer" | "deep";
export type Risk = "LOW" | "MEDIUM" | "HIGH" | "EXTREME";
export interface Trip {
  id: string;
  name: string;
  destination: string;
  zone: Zone;
  duration: string;
  departure: string;
  seats: number;
  risk: Risk;
  price: number;
  description: string;
  highlights: string[];
  visual: string;
  accent: string;
}

export interface CartItem {
  trip: Trip;
  passengers: number;
}

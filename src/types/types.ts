export interface Animal {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  weight: number;
  createdAt: string;
}

export interface HealthRecord {
  id: string;
  animalId: string;
  title: string;
  date: string;
  notes?: string;
  createdAt: string;
}

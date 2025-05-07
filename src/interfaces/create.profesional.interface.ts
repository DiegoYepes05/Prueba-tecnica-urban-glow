
export interface Professional {
  id: string;
  full_name: string;
  city: string;
  specialty: string;
  contact: number;
  photo?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface CreateProfessional {
  full_name: string;
  city: string;
  specialty: string;
  contact: number;
  photo?: string;
}
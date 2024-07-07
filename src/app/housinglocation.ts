export interface HousingLocation {
  id: number;
  name: string;
  positionName: string | undefined;
  companyName: string | undefined;
  city: string;
  state: string;
  photo: string | undefined;
  photo2: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}

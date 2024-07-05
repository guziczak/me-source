export interface HousingLocation {
  id: number;
  name: string;
  positionName: string | undefined;
  city: string;
  state: string;
  photo: string;
  photo2: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}

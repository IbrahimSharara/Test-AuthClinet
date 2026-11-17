export interface UserDetails {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
}

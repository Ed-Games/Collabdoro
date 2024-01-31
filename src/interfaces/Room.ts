export interface IRoom {
  name: string;
  isActive: boolean;
  adminId: string;
  createdAt: string;
  endedAt?: string;
}
export interface Message {
  id: string;
  content: string;
  sender: string;
  reciver: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  read: boolean;
}

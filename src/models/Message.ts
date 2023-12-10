export interface Message {
  id?: string,
  userId?: string,
  destination: string,
  description: string,
  dueDate: Date,
  createdAt?: Date
}

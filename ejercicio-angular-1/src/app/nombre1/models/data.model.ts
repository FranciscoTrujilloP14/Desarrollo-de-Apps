export class DataModel {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }
}

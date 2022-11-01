export interface IEquipment {
  name: string;
  tags: string[];
  id: string;
}

export type ICreateEquipmentDto = Omit<IEquipment, 'id'>;

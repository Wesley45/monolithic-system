import { AggregateRoot } from "@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "@shared/domain/entity/base.entity";
import { Id } from "@shared/domain/value-object/id.value-object";

export class ProductId extends Id {
  constructor(id: string) {
    super(id);
  }
}

type ProductProps = {
  id?: ProductId;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _price: number;

  constructor({ id, price, name, createdAt, updatedAt }: ProductProps) {
    super(id, createdAt, updatedAt);
    this._price = price;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._price <= 0) {
      throw new Error("Price must be greater than zero");
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}

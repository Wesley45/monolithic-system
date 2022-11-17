import { AggregateRoot } from "@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "@shared/domain/entity/base.entity";
import { Address } from "@shared/domain/value-object/address.value-object";
import { Id } from "@shared/domain/value-object/id.value-object";
import { Product } from "./product.entity";

export class InvoiceId extends Id {
  constructor(id: string) {
    super(id);
  }
}

type InvoiceProps = {
  id?: InvoiceId;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: Product[];

  constructor({
    id,
    name,
    document,
    address,
    items,
    createdAt,
    updatedAt,
  }: InvoiceProps) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._document = document;
    this._address = address;
    this._items = items;
  }

  get name() {
    return this._name;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }

  get items() {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}

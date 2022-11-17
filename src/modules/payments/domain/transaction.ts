import { AggregateRoot } from "@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "@shared/domain/entity/base.entity";
import { Id } from "@shared/domain/value-object/id.value-object";

export class TransactionId extends Id {
  constructor(id: string) {
    super(id);
  }
}

type TransactionProps = {
  id?: TransactionId;
  amount: number;
  orderId: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Transaction extends BaseEntity implements AggregateRoot {
  private _amount: number;
  private _orderId: string;
  private _status: string;

  constructor({
    id,
    amount,
    orderId,
    status,
    createdAt,
    updatedAt,
  }: TransactionProps) {
    super(id, createdAt, updatedAt);
    this._amount = amount;
    this._orderId = orderId;
    this._status = status || "pending";
    this.validate();
  }

  validate(): void {
    if (this._amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
  }

  approve(): void {
    this._status = "approved";
  }

  decline(): void {
    this._status = "declined";
  }

  process(): void {
    if (this._amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }

  get amount(): number {
    return this._amount;
  }

  get orderId(): string {
    return this._orderId;
  }

  get status(): string {
    return this._status;
  }
}

import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  price!: number;

  @ForeignKey(() => InvoiceModel)
  @Column
  invoiceId!: string;

  @BelongsTo(() => InvoiceModel)
  invoice!: Awaited<InvoiceModel>;

  @Column({ allowNull: false, field: "created_at" })
  createdAt!: Date;

  @Column({ allowNull: false, field: "updated_at" })
  updatedAt!: Date;
}

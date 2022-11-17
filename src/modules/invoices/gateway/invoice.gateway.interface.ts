import { Invoice } from "../domain/invoice.entity";

export interface InvoiceGatewayInterface {
  create(data: Invoice): Promise<Invoice>;
  find(id: string): Promise<Invoice | null>;
}

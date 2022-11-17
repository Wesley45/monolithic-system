import { InputCheckStockDto, OutputCheckStockDto } from "../dtos/CheckStockDto";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "../dtos/CreateProductDto";

export interface ProductAdminFacadeInterface {
  create(data: InputCreateProductDto): Promise<OutputCreateProductDto>;
  checkStock(data: InputCheckStockDto): Promise<OutputCheckStockDto>;
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const productos = await this.productModel.find();
    return productos;
  }

  async getProduct(productID: string): Promise<Product> {
    const producto = await this.productModel.findById(productID);
    return producto;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const producto = new this.productModel(createProductDTO);
    return await producto.save();
  }

  async deleteProduct(productID: string): Promise<Product> {
    const producto = await this.productModel.findByIdAndDelete(productID);
    return producto;
  }

  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const producto = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return producto;
  }
}

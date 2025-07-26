import { BlogCategory } from './../entity/BlogCategory';
import { Blog } from './../entity/Blog';
import { Address } from './../entity/Address';
import { DataSource } from "typeorm";
import { Customer } from "../entity/Customer";
import { Employee } from '../entity/Employee';
import { Factory } from '../entity/Factory';
import { InventoryItem } from '../entity/InventoryItem';
import { Menu } from '../entity/Menu';
import { Order } from '../entity/Order';
import { OrderDetail } from '../entity/OrderDetail';
import { Paymentmethod } from '../entity/Paymentmethod';
import { Product } from '../entity/Product';
import { ProductBatche } from '../entity/ProductBatche';
import { ProductCategory } from '../entity/ProductCategory';
import { ProductRequest } from '../entity/ProductRequest';
import { ProductVariant } from '../entity/ProductVariant';
import { QaulityCheck } from '../entity/QualityCheck';
import { Role } from '../entity/Role';
import { ShipmentDetail } from '../entity/ShipmentDetail';
import { Shipper } from '../entity/Shipper';
import { Shipping } from '../entity/Shipping';
import { SiteSetting } from '../entity/SiteSetting';
import { Staticspage } from '../entity/Staticspage';
import { Warehouse } from '../entity/Warehouse';
import { WarehouseImport } from '../entity/WarehouseImport';
import { RefreshToken } from '../entity/RefreshToken';
import { RoomCategory } from '../entity/RoomCategory';
import { Gallery } from '../entity/Gallery';
import { Color } from '../entity/Color';
import "reflect-metadata";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Address, Blog, BlogCategory, Customer, Employee, Factory, InventoryItem, Menu, Order, OrderDetail, Paymentmethod, Product, ProductBatche, ProductCategory, RoomCategory, ProductRequest, ProductVariant, QaulityCheck, Role, ShipmentDetail, Shipper, Shipping, SiteSetting, Staticspage, Warehouse, WarehouseImport, RefreshToken, Gallery, Color],
  synchronize: true,
  logging: false,
});
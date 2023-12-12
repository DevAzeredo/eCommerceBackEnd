"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/model/order.model.ts
var order_model_exports = {};
__export(order_model_exports, {
  default: () => order_model_default
});
module.exports = __toCommonJS(order_model_exports);

// src/Schemas/item.sch.ts
var import_mongoose = require("mongoose");
var itemSchema = new import_mongoose.Schema({
  id: { type: String, primaryKey: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true }
});
var ItemSch = (0, import_mongoose.model)("Item", itemSchema);

// src/model/dao/item.dao.ts
var ItemDAO = class {
  async insertItem(item) {
    const newItem = new ItemSch(item);
    return newItem.save();
  }
  async deleteItemById(itemId) {
    await ItemSch.deleteOne({ _id: itemId }).exec();
  }
  async updateItemById(itemId, updatedItem) {
    await ItemSch.updateOne({ _id: itemId }, { $set: updatedItem }).exec();
  }
  async updateManyItems(condition, updatedFields) {
    await ItemSch.updateMany(condition, { $set: updatedFields }).exec();
  }
  async getItemsByCondition(condition) {
    return ItemSch.find(condition).exec();
  }
  async getItemById(itemId) {
    return ItemSch.findById(itemId).exec();
  }
};

// src/model/item.model.ts
var ItemModel = class _ItemModel {
  static getInstance() {
    const itemModel = new _ItemModel();
    return itemModel;
  }
  constructor() {
    this.DAO = new ItemDAO();
  }
  async getManyById(itensId) {
    try {
      const itensWithValue = await this.DAO.getItemsByCondition({ id: { $in: itensId } });
      return itensWithValue;
    } catch (error) {
      return new Error(error.message);
    }
  }
};
var item_model_default = ItemModel;

// src/controller/item.controller.ts
var ItemController = class _ItemController {
  static getInstance() {
    const itemController = new _ItemController();
    return itemController;
  }
  async getManyById(itensId) {
    return item_model_default.getInstance().getManyById(itensId);
  }
};
var item_controller_default = ItemController;

// src/Schemas/order.sch.ts
var import_mongoose2 = require("mongoose");
var orderSchema = new import_mongoose2.Schema({
  id: { type: String, primaryKey: true },
  sellerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCellPhone: { type: String, required: true },
  dateRegistration: { type: Date, required: true },
  observation: { type: String, required: true },
  status: { type: String, required: true },
  itens: [{ type: import_mongoose2.Types.ObjectId, ref: "Item" }]
});
var OrderSch = (0, import_mongoose2.model)("Order", orderSchema);

// src/model/dao/order.dao.ts
var OrderDAO = class {
  async insertOrder(order) {
    const newOrder = new OrderSch(order);
    return newOrder.save();
  }
  async deleteOrderById(itemId) {
    await OrderSch.deleteOne({ _id: itemId }).exec();
  }
  async updateOrderById(itemId, updatedItem) {
    await OrderSch.updateOne({ _id: itemId }, { $set: updatedItem }).exec();
  }
  async updateManyOrders(condition, updatedFields) {
    await OrderSch.updateMany(condition, { $set: updatedFields }).exec();
  }
  async getOrdersByCondition(condition) {
    return OrderSch.find(condition).exec();
  }
  async getOrderById(itemId) {
    return OrderSch.findById(itemId).exec();
  }
};

// src/model/order.model.ts
var _OrderModel = class _OrderModel {
  static getInstance() {
    const orderModel = new _OrderModel();
    return orderModel;
  }
  constructor() {
    this.DAO = new OrderDAO();
  }
  async createOrder(order) {
    try {
      order.dateRegistration = /* @__PURE__ */ new Date();
      order.status = _OrderModel.PROCESSING_STATUS;
      const itensId = order.itens.map((item) => item.id);
      const itensWithValue = await item_controller_default.getInstance().getManyById(itensId);
      if (!(itensWithValue instanceof Error)) {
        order.itens = itensWithValue;
        await this.DAO.insertOrder(order);
        return order;
      } else {
        console.error(`Erro ao obter itens do pedido: ${itensWithValue.message}`);
        return itensWithValue;
      }
    } catch (error) {
      console.error(`Erro ao processar pedido: ${error.message}`);
      return new Error(error.message);
    }
  }
};
_OrderModel.PROCESSING_STATUS = "Processing";
var OrderModel = _OrderModel;
var order_model_default = OrderModel;

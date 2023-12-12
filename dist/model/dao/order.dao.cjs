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

// src/model/dao/order.dao.ts
var order_dao_exports = {};
__export(order_dao_exports, {
  OrderDAO: () => OrderDAO
});
module.exports = __toCommonJS(order_dao_exports);

// src/Schemas/order.sch.ts
var import_mongoose = require("mongoose");
var orderSchema = new import_mongoose.Schema({
  id: { type: String, primaryKey: true },
  sellerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCellPhone: { type: String, required: true },
  dateRegistration: { type: Date, required: true },
  observation: { type: String, required: true },
  status: { type: String, required: true },
  itens: [{ type: import_mongoose.Types.ObjectId, ref: "Item" }]
});
var OrderSch = (0, import_mongoose.model)("Order", orderSchema);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrderDAO
});

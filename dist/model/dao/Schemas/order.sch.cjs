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

// src/model/dao/Schemas/order.sch.ts
var order_sch_exports = {};
__export(order_sch_exports, {
  OrderSch: () => OrderSch
});
module.exports = __toCommonJS(order_sch_exports);
var import_mongoose2 = require("mongoose");

// src/model/dao/Schemas/item.sch.ts
var import_mongoose = require("mongoose");
var itemSchema = new import_mongoose.Schema({
  id: { type: String, primaryKey: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true }
});
var ItemSch = (0, import_mongoose.model)("Item", itemSchema);

// src/model/dao/Schemas/order.sch.ts
var orderSchema = new import_mongoose2.Schema({
  id: { type: String, primaryKey: true },
  sellerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCellPhone: { type: String, required: true },
  dateRegistration: { type: Date, required: true },
  observation: { type: String, required: true },
  status: { type: String, required: true },
  itens: [{ type: ItemSch, required: true }]
});
var OrderSch = (0, import_mongoose2.model)("Order", orderSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrderSch
});

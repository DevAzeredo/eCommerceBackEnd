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

// src/services/dao/item.dao.ts
var item_dao_exports = {};
__export(item_dao_exports, {
  ItemDAO: () => ItemDAO
});
module.exports = __toCommonJS(item_dao_exports);

// src/services/dao/schemas/item.sch.ts
var import_mongoose = require("mongoose");
var itemSchema = new import_mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true }
});
var ItemSch = (0, import_mongoose.model)("Item", itemSchema);

// src/services/dao/item.dao.ts
var ItemDAO = class {
  async insertManyItems(items) {
    try {
      const insertedItems = await ItemSch.insertMany(items);
      return insertedItems;
    } catch (error) {
      throw new Error(`Erro ao inserir itens: ${error.message}`);
    }
  }
  async getItemsByCondition(condition) {
    return ItemSch.find(condition).exec();
  }
  async getAllItems() {
    return ItemSch.find();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemDAO
});

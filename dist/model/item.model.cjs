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

// src/model/item.model.ts
var item_model_exports = {};
__export(item_model_exports, {
  default: () => item_model_default
});
module.exports = __toCommonJS(item_model_exports);

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

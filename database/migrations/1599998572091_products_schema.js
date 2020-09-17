"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductsSchema extends Schema {
  up() {
    this.create("products", (table) => {
      table.increments("id");
      table.string("product_name", 100);
      table.integer("quantity ", 100);
      table.integer("unit_price", 100);
      table.integer("total_price", 100);
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductsSchema;

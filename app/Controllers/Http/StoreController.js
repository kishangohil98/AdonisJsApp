"use strict";

const Product = use("App/Models/Product");

class StoreController {
  async index({ response }) {
    try {
      const product = new Product();
      const product_data = await Product.all();
      //console.log(product_data);
      return response.status(200).json(product_data);
    } catch (err) {
      console.log(err);
    }
  }

  async delete({ params, response }) {
    console.log("Delete API called");
    console.log(params.id);
    try {
      const product = new Product();
      const product_toDelete = await Product.find(`${params.id}`);

      await product_toDelete.delete();

      const product_data = await Product.all();
      return response.status(200).json(product_data);
    } catch (err) {
      console.log(err);
    }
  }

  async update({ request, response }) {
    console.log("Update API called");
    try {
      const { id, product_name, quantity, unit_price } = await request.post();

      const product = await Product.find(id);

      product.product_name = product_name;
      product.quantity = parseInt(quantity);
      product.unit_price = parseInt(unit_price);
      product.total_price = parseInt(quantity) * parseInt(unit_price);

      await product.save();

      const product_data = await Product.all();
      //console.log(product_data);
      return response.status(200).json(product_data);
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    try {
      const product = new Product();

      const { product_name, quantity, unit_price } = await request.post();

      console.log(quantity);

      product.product_name = product_name;
      product.quantity = parseInt(quantity);
      product.unit_price = parseInt(unit_price);
      product.total_price = parseInt(quantity) * parseInt(unit_price);
      console.log(product.total_price);

      await product.save();

      const product_data = await Product.all();
      console.log(product_data);

      return response.status(200).json(product_data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = StoreController;

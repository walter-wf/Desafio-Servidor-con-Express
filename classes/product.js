export default class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
      this.id = Product.idGenerator();
    }
  
    static idGenerator() {
      !this.idIncrement ? (this.idIncrement = 1) : this.idIncrement++
      return this.idIncrement
    }
  }
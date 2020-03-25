export class Order{

  datePlaced:number;
  items:any[];

  constructor(public userId,public shipping, shoppingCarts){
    this.datePlaced=new Date().getTime();
    this.items =Object.values(shoppingCarts).map(function(cart, index) {
      let totalPrice = 0;
      let product = cart["product"];
      totalPrice = product["price"] * cart["quantity"];
      return {
        product: {
          title: product["title"],
          price: product["price"],
          imageUrl: product["imageUrl"]
        },
        quantity: cart["quantity"],
        totalPrice: totalPrice
      };
    });
    console.log(this.items);

  }
}

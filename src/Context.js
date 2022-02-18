import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

export default class ProductProvider extends Component {
  state = {
    product: [],
    detailProduct: detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { product: tempProducts };
    });
  };

  getItem = (id) => {
    const newProduct = this.state.product.find((item) => item.id === id);
    return newProduct;
  };

  handleDetail = (id) => {
    const newProduct = this.getItem(id);
    this.setState(() => {
      return { detailProduct: newProduct };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.product];
    const index = tempProducts.indexOf(this.getItem(id));
    const newProduct = tempProducts[index];
    newProduct.inCart = true;
    newProduct.count = 1;
    const price = newProduct.price;
    newProduct.total = price;
    this.setState(() => {
      return {product:tempProducts, cart:[...this.state.cart,newProduct]};
    },() =>{this.addTotal()})
  };

  openModal = id =>{
    const product = this.getItem(id);
    this.setState(() =>{
      return {modalProduct:product,modalOpen:true}
    })
  }

  closeModal = () =>{
    this.setState(()=>{
      return {modalOpen:false};
    })
  }

  increment = id => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;
    
    this.setState(() => {
      return {
        cart : [...tempCart]
      }
    },() =>{this.addTotal()})
  }

  decrement = id => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count === 0){
      this.removeItem(id);
    }else{
      product.total = product.count * product.price;
      
      this.setState(() => {
        return {
          cart : [...tempCart]
        }
      },() =>{this.addTotal()})
    }
    
  }

  removeItem = id => {
    let tempProducts = [...this.state.product];
    let tempCart = [...this.state.cart];

    tempCart =tempCart.filter(item => item.id !== id)

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0; 

    this.setState(() => {
      return {
        cart : [...tempCart],
        product : [...tempProducts]
      }
    },() => {
      this.addTotal();
    })
  }

  clearCart = () => {
    this.setState(() => {
      return {cart:[]}
    }, () => {
      this.setProducts();
      this.addTotal();
    })
  }

  addTotal = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total))
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal : subTotal,
        cartTax : tax,
        cartTotal : total
      }
    })
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal:this.openModal,
          closeModal:this.closeModal,
          increment:this.increment,
          decrement:this.decrement,
          removeItem:this.removeItem,
          clearCart:this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'

import { ProductConsumer } from '../Context'

export default class Productlist extends Component {

  render() {

    
    return (

      <React.Fragment>
        <div className="py-5">
          <div className="container">
              <Title name = 'Our' title ='Products'/>
              <div className="row">
                <ProductConsumer>
                  {hello => {
                    return hello.product.map((item) => {
                       return <Product key={item.id} product = {item} />
                    })
                  }}
                </ProductConsumer>
              </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react';

import ProductCard from './ProductCard';

class Catalogue extends Component {
    componentWillMount() {
        const { getProducts } = this.props;
        getProducts();
    }

    render() {
        const { products, addToCart } = this.props;
        return (
            <React.Fragment>
                <div className="my-4 p-4 padding card">
                    <div className="row text-center px-4 head">
                        <h1>Catálogo de productos</h1>
                    </div>
                </div>
                {products && (
                    <section className="container d-flex flex-row justify-content-evenly flex-wrap">
                        {products.map(product => {
                            return (
                                <ProductCard product={product} addToCart={addToCart} key={product.id}/>
                            );
                        })}
                    </section>
                )}
            </React.Fragment>
        );
    }
}

export default Catalogue;

import React, { Component } from 'react';

class ProductCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { product, addToCart } = this.props;
        return (
            <div className="card my-3 mx-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">
                        {product.name}
                    </h5>
                    <p className="card-text">
                        {product.description}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => {addToCart(product.id)}}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        );
    }
}

export default ProductCard;
import React, { Component } from 'react';

class ProductList extends Component {
    componentWillMount() {
        const { getProducts } = this.props;
        getProducts();
    }

    render() {
        const { products } = this.props;
        return (
            <React.Fragment>
                <h1>Catálogo</h1>
                {products && (
                    <section className="container d-flex flex-row justify-content-between flex-wrap">
                        {products.map(product => {
                            return (
                                <div
                                    className="card"
                                    style={{ width: '18rem' }}
                                    key={product.id}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {product.name}
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            Card subtitle
                                        </h6>
                                        <p className="card-text">
                                            {product.description}
                                        </p>
                                        <a href="#" className="card-link">
                                            Agregar al carrito
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                )}
            </React.Fragment>
        );
    }
}

export default ProductList;

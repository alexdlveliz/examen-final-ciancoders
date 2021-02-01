import React, { Component } from 'react';
import NewProductForm from './NewProductForm';

class ProductCreate extends Component {
    state = {
        create: true,
    };

    componentWillMount() {
        const { getProduct, match } = this.props;
        const id = match.params.id;
        if (id) {
            this.setState({ create: false });
            getProduct(id);
        }
    }

    render() {
        const { create } = this.state;
        const { createProduct, updateProduct } = this.props;
        const action = window.location.href.includes('editar')
            ? updateProduct
            : createProduct;
        return <NewProductForm create={create} onSubmit={action} />;
    }
}

export default ProductCreate;

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectField } from '../Utils/renderField';
import { api } from '../../../utility/api';

const getOwnedProducts = search => {
    let products = [];
    return api
        .get('report/owned_products')
        .then(response => {
            if (response) {
                response.forEach(product => {
                    products.push({
                        value: product.id,
                        label: product.name,
                    });
                });
                return products;
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return [
                {
                    value: 0,
                    label: 'No hay productos',
                },
            ];
        });
};

class Report extends Component {
    componentWillMount() {
        const { getGlobalSales, getMeanPrice } = this.props;
        getGlobalSales();
        getMeanPrice();
    }

    render() {
        const { global_sales, mean_price, product_total, getProductTotal } = this.props;
        return (
            <React.Fragment>
                <div className="my-4 p-4 padding card">
                    <div className="row text-center px-4 head">
                        <h1>Reportes</h1>
                    </div>
                </div>
                <div className="my-4 p-4 padding card">
                    <div className="row d-flex flex-column head">
                        <h2>Total de ventas globales</h2>
                        <h3>Ventas globales en la tienda: Q.{global_sales}</h3>
                    </div>
                </div>
                <div className="my-4 p-4 padding card">
                    <div className="row d-flex flex-column head">
                        <h2>Promedio de precios</h2>
                        <h3>
                            Promedio de precios en la tienda: Q.{mean_price}
                        </h3>
                    </div>
                </div>
                <div className="my-4 p-4 padding card">
                    <div className="row d-flex flex-column head">
                        <h2>Total de ventas por producto</h2>
                        <div className="col-md-6 col-12 mb-2">
                            <div className="form-group">
                                <label htmlFor="product">
                                    Seleccione un producto
                                </label>
                                <Field
                                    name="product"
                                    label="product"
                                    component={AsyncSelectField}
                                    loadOptions={getOwnedProducts}
                                    className="form-control"
                                    onChange={value => {getProductTotal(value.value)}}
                                />
                            </div>
                        </div>
                        <h3>
                            Ventas del producto en la tienda: Q.{product_total}
                        </h3>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default reduxForm({
    form: 'Reports',
})(Report);

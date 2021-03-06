import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
    render() {
        const { cart, deleteCart, makeSale } = this.props;
        return (
            <React.Fragment>
                <div className="my-4 p-4 padding card">
                    <div className="row text-center px-4 head">
                        <h1>Carrito de compras</h1>
                    </div>
                </div>
                <section className="my-4 p-4 padding card">
                    {cart.length == 0 ? (
                        <div className="row">
                            <h1>No hay productos en el carrito</h1>
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className="row d-flex flex-column ">
                                <h1 className="text-center">Productos</h1>
                                <table className="table table-striped my-4">
                                    <thead>
                                        <tr className="table-info">
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(product => {
                                            return (
                                                <tr key={product.id}>
                                                    <th scope="row">
                                                        {product.name}
                                                    </th>
                                                    <td>Q.{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>
                                                        {product.price *
                                                            product.quantity}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row d-flex justify-content-between">
                                <Link to="/" className="btn btn-primary">
                                    Regresar al catálogo
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary mx-4"
                                        onClick={deleteCart}
                                    >
                                        Borrar carrito
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={makeSale}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </section>
            </React.Fragment>
        );
    }
}

export default Cart;

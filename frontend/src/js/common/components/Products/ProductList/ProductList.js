import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';

class ProductList extends Component {
    componentWillMount() {
        const { listProducts } = this.props;
        listProducts();
    }

    render() {
        const { data, loader, deleteProduct } = this.props;
        return (
            <div className="py-4">
                <div className="card">
                    <div className="p-4 padding">
                        <div className="row px-4 head">
                            <h1 className="text-center">Productos</h1>
                        </div>
                    </div>
                </div>
                <div className="my-4 p-4 padding card">
                    <div className="row justify-content-between px-4 head">
                        <h1 className="text-center">Tus productos</h1>
                        <Link
                            className="btn btn-primary mx-4 my-4"
                            to="/products/create"
                        >
                            Crear producto
                        </Link>
                    </div>
                    <div className="p-3 padding">
                        {data && (
                            <Grid
                                hover
                                striped
                                data={data}
                                loading={loader}
                                // onPageChange={onPageChange}
                                // onSortChange={onSortChange}
                            >
                                <TableHeaderColumn
                                    isKey
                                    dataField="name"
                                    dataSort
                                >
                                    Nombre
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="price" dataSort>
                                    ProductCreateContainer
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="stock" dataSort>
                                    Existencias
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="id"
                                    dataAlign="center"
                                    dataSort
                                    dataFormat={standardActions({
                                        editar: 'products',
                                        ver: 'products',
                                        eliminar: deleteProduct,
                                    })}
                                >
                                    Acciones
                                </TableHeaderColumn>
                            </Grid>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductList;

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    renderField,
    renderCurrency,
    renderNumber,
} from '../../Utils/renderField';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Ingrese el nombre del producto';
    }
    if (!values.description) {
        errors.description = 'Ingrese una descripción';
    }
    if (!values.price) {
        errors.price = 'Ingrese un precio';
    }
    if (values.price == 0) {
        errors.price = 'El precio debe ser mayor a Q.0.00';
    }
    if (!values.stock) {
        errors.stock = 'Ingrese la existencia del producto';
    }
    if (values.stock == 0) {
        errors.stock = 'Debe tener existencias mayores a 0';
    }
    
    return errors;
};

class NewProductForm extends Component {
    render() {
        const { handleSubmit, create } = this.props;
        const editar = location.href.includes('editar');
        let disabled = false;
        let titulo = editar
            ? 'Editar Producto'
            : 'Nuevo Producto';
        
        if(create == false && editar == false) {
            disabled = true;
            titulo = 'Datos del Producto';
        }
        return (
            <div className="py-4">
                <div className="container p-4 padding card">
                    <div className="text-center b-1 padding-bottom head">
                        <h1>{titulo}</h1>
                    </div>
                    <form
                        name="NewProduct"
                        className="form-validate mb-lg p-4 padding"
                        onSubmit={handleSubmit}
                    >
                        <div className="row">
                            <div className="col-md-6 col-12 mb-2">
                                <div className="form-group has-feedback">
                                    <label htmlFor="name">Nombre</label>
                                    <Field
                                        name="name"
                                        label="name"
                                        component={renderField}
                                        className="form-control"
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <div className="form-group has-feedback">
                                    <label htmlFor="description">
                                        Descripción
                                    </label>
                                    <Field
                                        name="description"
                                        label="description"
                                        component={renderField}
                                        className="form-control"
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <div className="form-group has-feedback">
                                    <label htmlFor="price">Precio</label>
                                    <Field
                                        name="price"
                                        label="price"
                                        component={renderCurrency}
                                        className="form-control"
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-2">
                                <div className="form-group has-feedback">
                                    <label htmlFor="stock">Existencias</label>
                                    <Field
                                        name="stock"
                                        label="stock"
                                        component={renderNumber}
                                        className="form-control"
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <Link className="btn btn-secondary" to="/products">
                                Regresar
                            </Link>
                            {disabled == false && (
                                <button type="submit" className="btn btn-primary">
                                    {' '}
                                    {editar ? 'Actualizar' : 'Registrar'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'NewProduct',
    validate: validate
})(NewProductForm);

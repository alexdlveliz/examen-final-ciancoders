import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const DELETE_CART = 'DELETE_CART';

export const getProducts = () => dispatch => {
    api.get('product/raw')
        .then(response => {
            dispatch({
                type: SET_PRODUCTS_LIST,
                products: response,
            });
        })
        .catch(error => {
            console.log('Error:', error);
            NotificationManager.error(
                'Ocurrió un error al recuperar el catálogo',
                'Error',
                0
            );
        });
};

export const addToCart = id => (dispatch, getStore) => {
    let cart = getStore().products.cart;
    api.get(`product/${id}`)
        .then(response => {
            // Verificar si ya existe este producto en el carrito
            let item = cart.find(product => product.id === response.id);

            if (item == undefined) {
                // Añadir nuevo producto
                cart.push({
                    id: response.id,
                    name: response.name,
                    price: response.price,
                    quantity: 1,
                });
            } else {
                // Eliminar registro de producto anterior
                let pos = cart.indexOf(item);
                cart.splice(pos, 1);

                // Creando nuevo registro con cantidad modificada
                item.quantity++;
                cart.push(item);
            }
            dispatch({
                type: ADD_PRODUCT_TO_CART,
                cart: cart,
            });
            NotificationManager.success(
                'Producto agregado, por favor visite el carrito para la compra',
                'Éxito',
                2000
            );
        })
        .catch(error => {
            console.log('Error: ', error);
            NotificationManager.error('Ha ocurrido un error', 'Error', 0);
        });
};

export const deleteCart = () => dispatch => {
    const newCart = [];
    dispatch({
        type: DELETE_CART,
        cart: newCart,
    });
    NotificationManager.warning('Carrito borrado', 'Éxito', 3000);
};

export const actions = {
    getProducts,
    addToCart,
    deleteCart,
};

export const reducers = {
    [SET_PRODUCTS_LIST]: (state, { products }) => {
        return {
            ...state,
            products,
        };
    },
    [ADD_PRODUCT_TO_CART]: (state, { cart }) => {
        return {
            ...state,
            cart,
        };
    },
    [DELETE_CART]: (state, { cart }) => {
        return {
            ...state,
            cart,
        };
    },
};

export const initialState = {
    loader: false,
    products: null,
    cart: [],
};

export default handleActions(reducers, initialState);

import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const SET_GLOBAL_SALE = 'SET_GLOBAL_SALE';
const SET_MEAN_PRICE = 'SET_MEAN_PRICE';
const SET_OWNED_PRODUCTS = 'SET_OWNED_PRODUCTS';

export const getGlobalSales = () => dispatch => {
    api.get('report/global_sales')
        .then(response => {
            dispatch({
                type: SET_GLOBAL_SALE,
                global_sales: response.global_sale
            });
        })
        .catch(error => {
            console.log(error);
        })
}

export const getMeanPrice = () => dispatch => {
    api.get('report/mean_price')
        .then(response => {
            dispatch({
                type: SET_MEAN_PRICE,
                mean_price: response.mean_price
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const getProductTotal = id => dispatch => {
    api.get(`report/${id}`)
        .then(response => {
            dispatch({
                type: SET_OWNED_PRODUCTS,
                product_total: response.product_total
            });
        })
        .catch(error => {
            console.log(error);
        })
}

export const actions = {
    getGlobalSales,
    getMeanPrice,
    getProductTotal
};

export const reducers ={
    [SET_GLOBAL_SALE]: (state, { global_sales }) => {
        return {
            ...state,
            global_sales
        }
    },
    [SET_MEAN_PRICE]: (state, { mean_price }) => {
        return {
            ...state,
            mean_price
        }
    },
    [SET_OWNED_PRODUCTS]: (state, { product_total }) => {
        return {
            ...state,
            product_total
        }
    }
};

export const initialState = {
    data: null,
    global_sales: 0,
    mean_price: 0,
    product_total: 0
}

export default handleActions(reducers, initialState);
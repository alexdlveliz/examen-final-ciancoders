import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_PRODUCTS_LIST = "SET_PRODUCTS_LIST";

export const getProducts = () => (dispatch) => {
    api.get("product/raw")
        .then((response) => {
            dispatch({
                type: SET_PRODUCTS_LIST,
                products: response,
            });
        })
        .catch((error) => {
            console.log("Error:", error);
            NotificationManager.error(
                "Ocurrió un error al recuperar el catálogo",
                "Error",
                0
            );
        });
};

export const actions = {
    getProducts,
};

export const reducers = {
    [SET_PRODUCTS_LIST]: (state, { products }) => {
        return {
            ...state,
            products,
        };
    },
};

export const initialState = {
    loader: false,
    products: null,
};

export default handleActions(reducers, initialState);

import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/products/products';
import ProductList from './ProductList';

const ms2p = state => {
    return {
        ...state.products
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(ProductList);
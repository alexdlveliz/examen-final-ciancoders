import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/reports/reports';
import Report from './Report';

const ms2p = state => {
    return {
        ...state.reports
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(Report);
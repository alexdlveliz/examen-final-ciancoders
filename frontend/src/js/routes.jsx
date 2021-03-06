import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import CatalogueContainer from './common/components/Products/Catalogue/CatalogueContainer';
import CartContainer from './common/components/Products/Cart/CartContainer';
import ProductListContainer from './common/components/Products/ProductList/ProductListContainer';
import ProductCreateContainer from './common/components/Products/ProductList/ProductCreateContainer';
import ReportContainer from './common/components/Reports/ReportContainer';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <PublicRoute exact path="/" component={CatalogueContainer} />
                <PublicRoute exact path="/cart" component={CartContainer} />

                <ProtectedRoute exact path="/products" component={ProductListContainer} />
                <ProtectedRoute exact path="/products/create" component={ProductCreateContainer} />
                <ProtectedRoute exact path="/products/:id" component={ProductCreateContainer} />
                <ProtectedRoute exact path="/products/:id/editar" component={ProductCreateContainer} />

                <ProtectedRoute exact path="/reports" component={ReportContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);

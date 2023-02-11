import React, { useEffect } from 'react';
import DashboardContainer from "./containers/MainContainer/MainContainer";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux';

export default function App () {
    const documents = useSelector(state=> state.documentReducer.documents);
    const dispatch = useDispatch();
    useEffect(()=> { 
        dispatch(actions.loadDocuments());
        dispatch(actions.loadProducts());
        dispatch(actions.loadClients());
    },[])
    useEffect(()=> { 
        //console.log(' all documents =>',documents)
    },[documents]);
    return(
        <ConfigProvider locale={frFR}>
            <div className='App'>
                <Router>
                    <DashboardContainer/>
                </Router>
            </div>
        </ConfigProvider>
    );
}
    
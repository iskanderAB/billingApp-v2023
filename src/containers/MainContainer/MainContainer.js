import React from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb} from 'antd';

import './DashboardContainer.css';
import Container from "../Container/Container";
import Sidebarcontainer from '../SideBarContainer/SideBarContainer';

const {Header, Footer} = Layout;

class DashboardContainer extends React.Component {
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sidebarcontainer/>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Container/>
                    <Footer style={{ textAlign: 'center' }}>Isaknder ABBASSI ©2021</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default DashboardContainer;

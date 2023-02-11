import React, { useState } from 'react';
import {
    ShoppingCartOutlined,
    UsergroupAddOutlined,
    DropboxOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';

import {
    Link
} from "react-router-dom";

const {Sider} = Layout;
const {SubMenu} = Menu;

const Sidebarcontainer = () => {
    const  [collapsed ,setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed((collapsed)=> !collapsed);
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {
                    /* 
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            <Link to='/'>
                                Dashboard
                            </Link>
                        </Menu.Item> 
                    */
                }
                <SubMenu key="sub1" icon={<ShoppingCartOutlined/>} title="Vente">
                    <Menu.Item key="2">
                        <Link to='/Avoir'>
                            Avoir
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/delivery-note'>
                            Bon de livraison
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="16">
                        <Link to='/release-voucher'>
                            Bon de sortie
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to='/bill'>
                            Facture
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="8" icon={<UsergroupAddOutlined />}>
                    <Link to='/client'>
                        Client
                    </Link>
                </Menu.Item>
                <Menu.Item key="10" icon={<DropboxOutlined />}>
                    <Link to='/product&service'>
                        Produit & Service
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default Sidebarcontainer;



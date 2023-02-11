import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './ToolsBar.css';
import { Button } from 'antd';
import AddModal from "../AddModal/AddModal";
import Search from '../UI/search/Search';
import { useDispatch } from 'react-redux';
import * as actions from  '../../store/actions/index';

const ToolsBar = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = () => {
        setVisible(false);
    };

    return (
        <div className='toolsBar'>
            <Button
                type="primary"
                size='large'
                onClick={() => {
                    setVisible(true);
                }}
            >
                <b>+ </b>  <span>Ajouter</span>
            </Button>
            <Search/>
            <AddModal
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default ToolsBar;

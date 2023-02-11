import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Modal} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Client from '../Client/Client';

const AddClientModal = () => {
    const visible = useSelector(state => state.clientReducer.visibleClient);
    const dispatch = useDispatch();
    return <Modal
    title= {"Ajouter Client"}
    style={{ top: 20 }}
    width={800}
    visible={visible}
    footer= {false}
    onCancel={() => dispatch(actions.changeVisibleClient(null))}
  >
    <Client  onCreate={()=> dispatch(actions.changeVisibleClient())}  />
  </Modal>
}
export default AddClientModal;
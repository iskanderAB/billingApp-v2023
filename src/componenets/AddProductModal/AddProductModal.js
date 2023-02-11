import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Modal} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Product from '../Product/Product';

const AddProductModal = () => {
    const visible = useSelector(state => state.productReducer.visibleProduct);
    const dispatch = useDispatch();
    return <Modal
    title= {"Ajouter Produit"}
    style={{ top: 20 }}
    width={800}
    visible={visible}
    footer= {false}
    onCancel={() => dispatch(actions.changeVisibleProduct())}
  >
    <Product  onCreate={()=> dispatch(actions.changeVisibleProduct())} />
  </Modal>
}
export default AddProductModal;
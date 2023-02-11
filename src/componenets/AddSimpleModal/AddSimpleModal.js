import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button , Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

const AddSimpleModal = () => {
    const visible = useSelector(state => state.rootReducer.visible);
    const type = useSelector(state => state.rootReducer.type);
    const dispatch = useDispatch();
    const [name , setName ] = useState('');
    const add = () => {
        if(type === 'mark' && name !==''){
          dispatch(actions.addMark(name));
        }
        else if (type === 'category' && name !=='') {
          dispatch(actions.addCategory(name));
        }

        dispatch(actions.changeVisible(null))
        setName(null);
    }
    return <Modal
      title= { type ==='mark' ?  "Ajouter Marque " : "Ajouter categorie" }
      style={{ top: 20 }}
      visible={visible}
      onOk={add}
      onCancel={() => dispatch(actions.changeVisible(null))}
    >
    <Input size='large' value={name} name='Marque' onChange={(e)=> setName(e.target.value) } placeholder={ type ==='mark' ?  " Marque ... " : "Categorie ... " } />
  </Modal>
}
export default AddSimpleModal;
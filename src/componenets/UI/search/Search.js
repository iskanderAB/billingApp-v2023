import React from 'react'
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import * as actions from '../../../store/actions/index';
const { Search } = Input;
const SearchUI = () => {
    const dispatch = useDispatch();
    
    const onSearch = (e='') =>{     
        let txt = e.target.value || '' ;
        if (txt!==undefined)
            dispatch(actions.filter(txt));

    } 
    return (
        <div>
            <Search size='large' placeholder="input search text"  onChange={(e) =>onSearch(e)}  style={{ minWidth: 300 , width :'40vw'}} enterButton />
        </div>
    )
}


// dispatch(actions.filter(value))
// dispatch(actions.filter(e.target.value))
export default SearchUI



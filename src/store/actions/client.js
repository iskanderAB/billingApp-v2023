import * as types from "./actionTypes";
import { Tag } from "antd";
import moment from "moment";

export const loadClients = (_) => {
  return (dispatch) => {
    window.electronAPI.loadClients().then((result) => {
      dispatch({
        type: types.LOAD_CLIENTS,
        payload: JSON.parse(result).map((v, i) => {
          v.key = `client-${i}`;
          // if(!v.tel) { 
          //   v.tel = (
          //       <span>
          //         {" "}
          //         <Tag color="volcano"> Indisponible </Tag>
          //       </span>
          //   );
          // }
          return v;
        }),
      });
    });
  };
};

export const addClient = (client) => {
  return (dispatch) => {
    window.electronAPI
      .addClient(client)
      .then((result) => {
        result= JSON.parse(result); 
        result.key = `client-${result.id}-${Date.now()}}`
        dispatch({
          type: types.ADD_CLIENT,
          payload: result,
        });
      })
      .catch((error) => false);
  };
};



export const changeVisibleClient = (data=null) => {
  return {
    type : types.CHNAGE_VISIBLE_CLIENT_MODAL,
    payload : data 
  }
}

export const updateClient = (data) =>{ 
    return (dispatch , getState) => {
      const updatedClient = {
        id : getState().clientReducer.clientData.id,
        ...data
      }
      window.electronAPI.updateClient(updatedClient).then(result => { 
        return dispatch({
          type : types.UPDATE_CLIENT,
          payload : updatedClient
        })
      })
    }
}


export const deleteClient = (id) => {
  return (dispatch) =>
    window.electronAPI
      .deleteClient(id)
      .then((_) => {
        dispatch({
          type: types.DELETE_CLIENT,
          payload: id,
        });
      })
      .catch((err) => {
        //TODO
        alert("nous ne pouvons pas supprimer ce client ");
      });
};

export const filter = (txt) => {
  return (dispatch) => { 
    dispatch({
      type : types.FILTER,
      payload : txt
    });
  }
}

export const addPayments= (date,amount,PersonId,typePayments,checkNum=null,checkName=null,checkDate=null) => { 
  return (dispatch)=>{
    //console.log("debug => ",date,amount,PersonId,typePayments)
    window.electronAPI
      .addPayments(PersonId, +amount, date,typePayments,checkNum,checkName,checkDate)
      .then(res => {
        const { dataValues } = res;
        //console.log("dataVlaue ",dataValues);
        dispatch({
          type: types.UPDATE_PAYMENTS,
          payload: dataValues
        });
        //console.log("[add payment]")
      })
      .catch(error => { 
        //console.log("error from paym  ents => ", error)
      })
  }
}

export const removePayments = (id,PersonId) => {
  return (dispatch) =>
    window.electronAPI
      .removePayments(id)
      .then((_) => {
        dispatch({
          type: types.REMOVE_PAYMENTS,
          payload: {
            id,
            PersonId
          }
        });
      })
      .catch((err) => {
        //TODO
        //console.log("error => ", err);
        alert("nous ne pouvons pas supprimer ce payment ");
      });
};
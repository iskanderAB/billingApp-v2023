import * as actionTypes from "../actions/actionTypes";
import produce, { original } from "immer";

const initialState = {
  clients: [],
  visibleClient: false, // modal client,
  clientData: null,
};

export default (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.LOAD_CLIENTS:
        //console.log("load client ", payload);
        draft.clients = payload;
        break;
      case actionTypes.ADD_CLIENT:
        draft.clients.push(payload);
        break;
      case actionTypes.CHNAGE_VISIBLE_CLIENT_MODAL:
        draft.visibleClient = !draft.visibleClient;
        draft.clientData = payload;
        break;
      case actionTypes.UPDATE_CLIENT:
        //console.log("payload", payload);
        let target = draft.clients.findIndex((v) => v.id == payload.id);
        draft.clients[target] = {
          ...payload,
          key: draft.clients[target]["key"],
        };
        break;
      case actionTypes.DELETE_CLIENT:
        draft.clients = draft.clients.filter((v) => v.id !== payload);
        break; 
      case actionTypes.UPDATE_PAYMENTS:
        //console.log("payload", payload);
        let clientIndexUpdate = draft.clients.findIndex((v) => v.id == payload.PersonId);
        draft.clients[clientIndexUpdate].Payments.push(payload)
        break;     
      case actionTypes.REMOVE_PAYMENTS:
        //console.log("remouved",payload);
        let clientIndex = draft.clients.findIndex((v) => v.id == payload.PersonId);
        draft.clients[clientIndex].Payments = 
          draft.clients[clientIndex].Payments.filter(v => v.id != payload.id);
        break;   
    }
  });

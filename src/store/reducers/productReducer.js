import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  products: [],
  productData : null,
  visibleProduct: false,
};

export default (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.CREATE_PRODUCT:
        //console.log("added product ", payload);
        draft.products.push(payload);
        break;
      case actionTypes.DELETE_RECORD_PRODUCT:
        draft.products = draft.products.filter((v) => v.id !== payload);
        break;
      case actionTypes.LOAD_PRODUCT:
        draft.products = payload;
        break;
      case actionTypes.CHNAGE_VISIBLE_PRODUCT_MODAL:
        draft.visibleProduct = !draft.visibleProduct;
        draft.productData = payload;
        break;
      case actionTypes.UPDATE_PRODUCT:
        //console.log("payload", payload);
        let target = draft.products.findIndex((v) => v.id == payload.id);
        draft.products[target] = {
          ...payload,
          key: draft.products[target]["key"],
        };    
        break;
      case actionTypes.EDIT_STOCK:
        //console.log("stock => ",draft.products.find(v => v.id == payload.id)['stock']);
        draft.products.find(v => v.id == payload.id)['stock'] -= payload.quantity ;
        break;      
      default:
        break;
    }
  });

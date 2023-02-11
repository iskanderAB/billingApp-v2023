import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  marks: [],
  categories: [],
  visible: false, // simple modal
  type: null, //add Mark or Category,
  txtSearch : ''
};

export default (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.LOAD_MARKS:
        //console.log("2 load marks");
        draft.marks = payload;
        break;
      case actionTypes.LOAD_CATEGORIES:
        draft.categories = payload;
        break;
      case actionTypes.CHNAGE_VISIBLE:
        draft.visible = !draft.visible;
        draft.type = payload;
        break;
      case actionTypes.ADD_MARK:
        draft.marks.push(payload);
        break;
      case actionTypes.ADD_CATEGORY:
        draft.categories.push(payload);
        break;
      case actionTypes.FILTER:
        draft.txtSearch = payload;
        break; 
      default:
        break;
    }
  });

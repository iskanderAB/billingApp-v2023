import * as actionTypes from "../actions/actionTypes";
import produce from "immer";
import moment from "moment";

const initialState = {
  commandLines: [],
  tax: {
    tva: 19,
    taxStamp: 1,
  },
  tvaTable: [],
  client: null,
  registrationNumber : "",
  driver : "",
  date: moment().toDate(),
  documents: [],
  pdfReader: false,
  documentToRead: null,
};

const updateReducerWithProduce = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.ADD_COMMAND_LINE:
        draft.commandLines.push(action.payload);
        break;
      case actionTypes.REMOVE_COMMAND_LINE:
        draft.commandLines = draft.commandLines.filter(
          (v) => v.key !== action.payload
        );
        break;
      case actionTypes.EDIT_COMMAND_LINE:
        const target = draft.commandLines.find(
          (v) => v.key === action.payload.key
        );
        target[action.payload.index] = action.payload.value;
        break;
      case actionTypes.CHNAGE_CLIENT:
        draft.client = action.payload;
        break;
      case actionTypes.CHNAGE_DATE:
        draft.date = action.payload;
        break;
      case actionTypes.LOAD_DOCUMENT:
        draft.documents = action.payload;
        break;
      case actionTypes.ADD_DOCUMENT:
        draft.documents.push(action.payload);
        break;
      case actionTypes.CLEAN_DOCUMENT:
        draft.commandLines = [];
        draft.client = null;
        draft.date = moment().toDate();
        draft.driver = "";
        draft.registrationNumber = ""
        break;
      case actionTypes.CHANGE_PDF_READER_VISIBILITY:
        draft.pdfReader = !draft.pdfReader;
        break;
      case actionTypes.GET_DOCUMENT_BY_ID:
        draft.documentToRead = action.payload;
        break;
      case actionTypes.CHANGE_TVA_TABLE:
        draft.tvaTable = action.payload;
        break;
      case actionTypes.DELETE_DOCUMENT:
        draft.documents = draft.documents.filter(v =>  v.id != action.payload);
        break;
      case actionTypes.CHANGE_STATUT:
        draft.documents.find(v => v.id == action.payload.id).status = !action.payload.statut;
        break;     
      case actionTypes.CHANGE_DRIVER:
        draft.driver = action.payload
        break;  
      case actionTypes.CHANGE_REGISTRATION_NUMBER:
        draft.registrationNumber = action.payload
        break;  
      case actionTypes.SWITCH_DOCUMENT_TYPE:
        draft.documents = draft.documents.filter(v => v.id !== action.payload.id) ; 
        draft.documents.push(action.payload.document);
        break;                  
      default:
        break;
    }
  });

export default updateReducerWithProduce;
// export default (state = initialState, { type, payload }) => produce((state,draft)=> {
//     switch (type) {
//     case actionTypes.ADD_COMMAND_LINE:
//         draft.commandLines.push(payload);
//         break;
//     default:
//         break;
//     }
// })

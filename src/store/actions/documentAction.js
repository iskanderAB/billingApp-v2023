import moment from "moment";
import * as types from "./actionTypes";
import { Tag } from "antd";

export const loadDocuments = (_) => {
  return (dispatch) => {
    window.electronAPI.loadDocuments().then((result) => {
      dispatch({
        type: types.LOAD_DOCUMENT,
        payload: JSON.parse(result).map((v) => {
          v.Person = v.Person ? v.Person.fullName : "element effacer";
          v.key = `documentLoded-${v.id}}`;
          v.TTC = v.TTC.toFixed(3);
          v.date = v.date; //moment(v.date).format("DD/MM/YYYY") FIXME: 
          return v;
        }),
      });
    });
  };
};

export const changeClient = (client) => {
  return (dispatch) => {
    dispatch({
      type: types.CHNAGE_CLIENT,
      payload: client,
    });
  };
};

export const changeDate = (date) => {
  return (dispatch) => {
    dispatch({
      type: types.CHNAGE_DATE,
      payload: date,
    });
  };
};

export const addCommandLine = (commandLine) => {
  return {
    type: types.ADD_COMMAND_LINE,
    payload: commandLine,
  };
};

export const remouveCommandLine = (key) => {
  return {
    type: types.REMOVE_COMMAND_LINE,
    payload: key,
  };
};

export const editComandLine = (payload) => {
  return {
    type: types.EDIT_COMMAND_LINE,
    payload,
  };
};

export const addDocument = (type, baseTva, tvaTable) => {
  return (dispatch, state) => {
    const newDocument = {
      PersonId: state().documentReducer.client.data.id,
      driver: state().documentReducer.driver,
      registrationNumber: state().documentReducer.registrationNumber,
      CommandLines: state().documentReducer.commandLines.map((v) => {
        if (type === "Facture")
          dispatch({
            type: types.EDIT_STOCK,
            payload: { id: v.product.id, quantity: v.quantity },
          });
        return {
          designation: v.product.designation,
          internal_reference: v.product.internal_refernce,
          tva: v.product.tva,
          price: v.price,
          quantity: v.quantity,
          ProductId: v.product.id,
          discount: v.discount,
        };
      }),
      type,
      date: state().documentReducer.date,
      TTC: (baseTva + tvaTable.reduce((a, c) => a + c[2], 0)).toFixed(3),
      PHT: baseTva,
      reference: `${
        type === "Facture"
          ? "F-" +
            (state().documentReducer.documents.filter(
              (v) => {
                return v.type == "Facture" &&  moment(v.date).year().toString() == new Date().getFullYear()
              }
            ).length === 0
              ? 1
              : +state()
                  .documentReducer.documents.filter((v) => v.type == "Facture" &&  moment(v.date).year().toString() == new Date().getFullYear())
                  .reverse()[0]
                  ["reference"].split("-")[1] + 1)
          : type === "Avoir"
          ? "Av-" +
            (state().documentReducer.documents.filter((v) => v.type == "Avoir")
              .length === 0
              ? 1
              : +state()
                  .documentReducer.documents.filter((v) => v.type == "Avoir")
                  .reverse()[0]
                  ["reference"].split("-")[1] + 1)
          : type === "Avoir-Facture"
              ? "AvF-" +
                (state().documentReducer.documents.filter((v) => v.type == "Avoir-Facture")
                  .length === 0
                  ? 1
                  : +state()
                      .documentReducer.documents.filter((v) => v.type == "Avoir-Facture")
                      .reverse()[0]
                      ["reference"].split("-")[1] + 1)

          : type === "deliveryNote"
          ? "BL-" +
            (state().documentReducer.documents.filter(
              (v) => v.type == "deliveryNote"
            ).length === 0
              ? 1
              : +state()
                  .documentReducer.documents.filter(
                    (v) => v.type == "deliveryNote"
                  )
                  .reverse()[0]
                  ["reference"].split("-")[1] + 1)
          : type === "releaseVoucher"
          ? "BS-" +
            (state().documentReducer.documents.filter(
              (v) => v.type == "releaseVoucher"
            ).length === 0
              ? 1
              : +state()
                  .documentReducer.documents.filter(
                    (v) => v.type == "releaseVoucher"
                  )
                  .reverse()[0]
                  ["reference"].split("-")[1] + 1)
          : type
      }`,
      status: false,
    };
    //console.log("new document from react =>", newDocument);
    window.electronAPI
      .addDocument(newDocument)
      .then((result) => {
        //console.log("new document result ", result);
        result.key = `document-${
          state().documentReducer.documents.length
        }-${Date.now()}`;
        result.status = false;
        dispatch({
          type: types.ADD_DOCUMENT,
          payload: result,
        });
      })
      .catch((error) =>false);
  };
};

export const deleteDocument = (id) => {
  //console.log("document => ", id);
  return (dispatch) =>
    window.electronAPI
      .deleteDocument(id)
      .then((_) => {
        dispatch({
          type: types.DELETE_DOCUMENT,
          payload: id,
        });
      })
      .catch((err) => {
        //TODO
        alert("nous ne pouvons pas supprimer ce document ");
      });
};

export const cleanDocument = () => {
  return (dispatch) => {
    dispatch({
      type: types.CLEAN_DOCUMENT,
    });
  };
};

export const changePdfReaderVisibility = () => {
  return {
    type: types.CHANGE_PDF_READER_VISIBILITY,
  };
};

export const getDocumentById = (id) => {
  return (dispatch) =>
    window.electronAPI
      .getDocumentById(id)
      .then((result) => {
        //console.log("document by id => ", JSON.parse(result));
        dispatch({
          type: types.GET_DOCUMENT_BY_ID,
          payload: JSON.parse(result),
        });
      })
      .catch((error) =>false);
};

export const changeStatut = (id, statut) => {
  //console.log("#action", statut);
  return (dispatch) =>
    window.electronAPI
      .changeStatut(id, statut)
      .then((_) => {
        dispatch({
          type: types.CHANGE_STATUT,
          payload: {
            id,
            statut,
          },
        });
      })
      .catch((error) => false );
};

export const changeTvaTable = (tableTva) => {
  return {
    type: types.CHANGE_TVA_TABLE,
    payload: tableTva,
  };
};
export const changeDriver = (driver) => {
  return {
    type: types.CHANGE_DRIVER,
    payload: driver,
  };
};
export const changeRegistrationNumber = (registrationNumber) => {
  return {
    type: types.CHANGE_REGISTRATION_NUMBER,
    payload: registrationNumber,
  };
};
export const switchDocumentType = (id, type) => {
  //console.log("#action", type);

  return (dispatch , state) => {
    const reference = `${
      type === "Facture"
        ? "F-" +
          (state().documentReducer.documents.filter((v) => v.type == "Facture")
            .length === 0
            ? 1
            : +state()
                .documentReducer.documents.filter((v) => v.type == "Facture")
                .reverse()[0]
                ["reference"].split("-")[1] + 1)
        : type === "Devis"
        ? "D-" +
          (state().documentReducer.documents.filter((v) => v.type == "Devis")
            .length === 0
            ? 1
            : +state()
                .documentReducer.documents.filter((v) => v.type == "Devis")
                .reverse()[0]
                ["reference"].split("-")[1] + 1)
        : type === "Commande"
        ? "C-" +
          (state().documentReducer.documents.filter((v) => v.type == "Commande")
            .length === 0
            ? 1
            : +state()
                .documentReducer.documents.filter((v) => v.type == "Commande")
                .reverse()[0]
                ["reference"].split("-")[1] + 1)
        : type === "deliveryNote"
        ? "BL-" +
          (state().documentReducer.documents.filter(
            (v) => v.type == "deliveryNote"
          ).length === 0
            ? 1
            : +state()
                .documentReducer.documents.filter(
                  (v) => v.type == "deliveryNote"
                )
                .reverse()[0]
                ["reference"].split("-")[1] + 1)
        : type === "releaseVoucher"
        ? "BS-" +
          (state().documentReducer.documents.filter(
            (v) => v.type == "releaseVoucher"
          ).length === 0
            ? 1
            : +state()
                .documentReducer.documents.filter(
                  (v) => v.type == "releaseVoucher"
                )
                .reverse()[0]
                ["reference"].split("-")[1] + 1)
        : type
    }`;
    //console.log('refernce =>' , reference);
    window.electronAPI
      .switchDocumentType(id, type, reference)
      .then(result => {
        //console.log(" result =>  ",result);
        result.date = moment(result.date).format("DD/MM/YYYY");
        result.key = `document-${
          state().documentReducer.documents.length
        }-${Date.now()}`;
        result.status = false;
        dispatch({
          type: types.SWITCH_DOCUMENT_TYPE,
          payload: {
            id,
            document : result
          },
        });
      })
      .catch((error) =>false);
  };
};

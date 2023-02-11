import * as types from "./actionTypes";
import { Tag } from "antd";

export const loadProducts = (_) => {
  return (dispatch) => {
    window.electronAPI.loadProducts().then((result) => {
      dispatch({
        type: types.LOAD_PRODUCT,
        payload: JSON.parse(result).map((v, i) => {
          v.key = `product-${i}`;
          v.tax = (
            <span>
              {" "}
              <Tag color="volcano"> Indisponible </Tag>
            </span>
          );
          if (!v.stock) {
             if (v.type==='S') 
              v.stock = <span>
                          {" "}
                          <Tag color="volcano"> Indisponible </Tag>{" "}
                        </span>
             else 
              v.stock = 0            
          }
          if (!v.buyingPrice) {
            v.buyingPrice = (
              <span>
                {" "}
                <Tag color="volcano"> Indisponible </Tag>
              </span>
            );
          }
          if (v.Category) {
            v.Category = v.Category.name;
          } else {
            v.Category = (
              <span>
                {" "}
                <Tag color="volcano"> Indisponible </Tag>
              </span>
            );
          }
          if (v.Mark) {
            v.Mark = v.Mark.name;
          } else {
            v.Mark = (
              <span>
                {" "}
                <Tag color="volcano"> Indisponible </Tag>
              </span>
            );
          }
          return v;
        }),
      });
    });
  };
};

export const deleteRecord = (id) => {
  return (dispatch) =>
    window.electronAPI
      .deleteProduct(id)
      .then((_) => {
        dispatch({
          type: types.DELETE_RECORD_PRODUCT,
          payload: id,
        });
      })
      .catch((err) => {
        alert("nous ne pouvons pas supprimer ce produit");
      });
};

export const loadMarks = () => {
  return (dispatch) =>
    window.electronAPI
      .loadMarks()
      .then((result) => {
        dispatch({
          type: types.LOAD_MARKS,
          payload: result,
        });
      })
      .catch((e) => false);
};

export const loadCategories = () => {
  return (dispatch) =>
    window.electronAPI
      .loadCategories()
      .then((result) => {
        dispatch({
          type: types.LOAD_CATEGORIES,
          payload: result,
        });
      })
      .catch((e) =>false);
};

export const createProduct = (product) => {
  return (dispatch, getState) => {
    //console.log("product action =>", product);
    window.electronAPI
      .createProduct(product)
      .then((result) => {
        //console.log("product created ! result  =>", result);
        //FIXME sallah el state rodha native code maghir JSX w a3mel el modification fel componenets 
        dispatch({
          type: types.CREATE_PRODUCT,
          payload: {
            ...result.dataValues,
            key: `product-${getState().productReducer.products.length}`,
            Mark: result.dataValues.MarkId ? (
              getState().rootReducer.marks.find(
                (v) => v.id === result.dataValues.MarkId
              ).name
            ) : (
              <span>
                {" "}
                <Tag color="volcano"> Indisponible </Tag>{" "}
              </span>
            ), // if u don't put any category u have an error thats why i create this test same for mark
            Category: result.dataValues.CategoryId ? (
              getState().rootReducer.categories.find(
                (v) => v.id === result.dataValues.CategoryId
              ).name
            ) : (
              <span>
                {" "}
                <Tag color="volcano"> Indisponible </Tag>{" "}
              </span>
            ),
            tax: (
              <span>
                {" "}
                <Tag color="volcano"> Indisponible </Tag>{" "}
              </span>
            ),
            buyingPrice : (
              result.dataValues.type === 'S' 
              ? 
                <span>
                  {" "}
                  <Tag color="volcano"> Indisponible </Tag>{" "}
                </span>
             :
                result.dataValues.buyingPrice
            ),
            stock : (
              result.dataValues.type === 'P' 
                   ?  
                      result.dataValues.stock 
                   :       
                    <span>
                      {" "}
                      <Tag color="volcano"> Indisponible </Tag>{" "}
                    </span>
            )
          },
        });
        //console.log("product => ", result.dataValues);
      })
      .catch((e) => false);
  };
};

export const changeVisible = (type) => {
  return {
    type: types.CHNAGE_VISIBLE,
    payload: type,
  };
};

export const addMark = (Mark) => {
  return (dispatch, getState) => {
    window.electronAPI
      .addMark(Mark)
      .then((result) => {
        //console.log(result);
        dispatch({
          type: types.ADD_MARK,
          payload: {
            ...result.dataValues,
            key: getState().rootReducer.marks.length,
          },
        });
      })
      .catch((error) => false );
  };
};

export const addCategory = (Category) => {
  return (dispatch, getState) => {
    window.electronAPI
      .addCategory(Category)
      .then((result) => {
        //console.log(result);
        dispatch({
          type: types.ADD_CATEGORY,
          payload: {
            ...result.dataValues,
            key: getState().rootReducer.categories.length,
          },
        });
      })
      .catch((error) => false );
  };
};

export const updateProduct = (data) =>{

  //console.log("data => ♥ " , data)
  return (dispatch , getState) => {
    const updatedProduct = {
      id : getState().productReducer.productData.id,
      ...data,
      Mark: data.MarkId ? (
        getState().rootReducer.marks.find(
          (v) => v.id === data.MarkId
        ).name
      ) : (
        <span>
          {" "}
          <Tag color="volcano"> Indisponible </Tag>{" "}
        </span>
      ), // if u don't put any category u have an error thats why i create this test same for mark
      Category: data.CategoryId ? (
        getState().rootReducer.categories.find(
          (v) => v.id === data.CategoryId
        ).name
      ) : (
        <span>
          {" "}
          <Tag color="volcano"> Indisponible </Tag>{" "}
        </span>
      ),
      buyingPrice : (
        data.type === 'S' 
        ? 
          <span>
            {" "}
            <Tag color="volcano"> Indisponible </Tag>{" "}
          </span>
       :
          data.buyingPrice
      ),
      stock : +data.stock
    }
    window.electronAPI.updateProduct({id : getState().productReducer.productData.id,...data}).then(result => { 
      return dispatch({
        type : types.UPDATE_PRODUCT,
        payload : updatedProduct
      })
    })
    //console.log(" client É => ", updateProduct);
  }
}

export const changeVisibleProduct = (data=null) => {
  //console.log("data => ",data);
  return {
    type: types.CHNAGE_VISIBLE_PRODUCT_MODAL,
    payload : data
  };
};

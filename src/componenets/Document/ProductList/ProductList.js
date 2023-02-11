import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Form, Input, Button, Space } from "antd";
import "./ProductList.css";
import Divider from "antd/lib/divider";
import { MinusCircleOutlined } from "@ant-design/icons";
import AdvancedSelect from "../../UI/AdvancedSelect/AdvancedSelect";
import * as actions from "../../../store/actions/index";

const ProductList = ({ form }) => {
  const rows = useSelector((state) => state.documentReducer.commandLines);
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    //console.log("Received values of form:", values);
  };
  useEffect(() => {
    //console.log("rows => ", rows);
    // 3maltha bech ne7seb el somme mta3 kol tva wahdo par exemple =>  [[19%, 3000DT],[13%,1500DT]]
    const tvas = [...new Set(rows.map((v) => v.tva))].map((v) => {
      return [
        v,
        rows
          .filter((element) => element.tva === v)
          .reduce(
            (p, c) =>
              p +
              (+c.price * +c.quantity -
                (+c.price * +c.quantity * c.discount) / 100),
            0
          ),
        rows
          .filter((element) => element.tva === v)
          .reduce(
            (p, c) =>
              p +
              ((+c.price * +c.quantity -
                (+c.price * +c.quantity * c.discount) / 100) *
                v) / 100,
            0
          ),
      ];
    });
    dispatch(actions.changeTvaTable(tvas));
  }, [rows]);

  // useEffect(() => {
  //   //console.log("form => ", form.getFieldsValue());
  // }, [form.getFieldsValue()]);
  const removeRow = (key) => {
    dispatch(actions.remouveCommandLine(key));
  };

  const editCommandLine = (payload) => {
    dispatch(actions.editComandLine(payload));
  };

  return (
    <table className="productListForm">
      <thead>
        <tr>
          <th>
            <span> Ref </span>
          </th>
          <th>
            <span> Désignation </span>
          </th>
          <th>
            <span>Quantité</span>
          </th>
          <th>
            <span>Prix HT</span>
          </th>
          <th>
            <span> TVA </span>
          </th>
          <th>
            <span> Remise % </span>
          </th>
          <th>
            <span> PU net TTC </span>
          </th>
          <th>
            <span> Total HT </span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((v, i, t) => (
          <tr key={v.key + i}>
            <td style={{ width: "100px" }}>
              <p>{v.product ? v.product.internal_refernce : "ref"}</p>
            </td>
            <td width="30%">
              <Form.Item
                name={`designation+${v.key}`}
                rules={[
                  {
                    required: true,
                    message: "S'il vous plaît entrer un produit !",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <AdvancedSelect
                  options={products.map((v, i) => {
                    return {
                      ...v,
                      name: v.designation,
                      id: v.id,
                      price: v.price,
                    };
                  })}
                  type="product"
                  onChange={(productKey, options) => {
                    if (options) {
                      //console.log("options =>", options);
                      editCommandLine({
                        key: v.key,
                        index: "product",
                        value: options.data,
                      });
                      editCommandLine({
                        key: v.key,
                        index: "price",
                        value: +options.data.price || 0,
                      });
                      editCommandLine({
                        key: v.key,
                        index: "tva",
                        value: +options.data.tva,
                      });
                    }
                  }}
                />
              </Form.Item>
            </td>

            <td width="10%">
              <div className="ant-row ant-form-item" style={{ rowGap: "0px" }}>
                <div className="ant-col ant-form-item-control">
                  <div className="ant-form-item-control-input">
                    <div className="ant-form-item-control-input-content">
                      <input
                        className="ant-input ant-input-lg"
                        type={"number"}
                        min={1}
                        placeholder={"1"}
                        value={v.quantity}
                        onChange={(e) =>
                          editCommandLine({
                            key: v.key,
                            index: "quantity",
                            value: +e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>
            {/*created for copying antd input and change value as i like */}
            <td width="10%">
              <div className="ant-row ant-form-item" style={{ rowGap: "0px" }}>
                <div className="ant-col ant-form-item-control">
                  <div className="ant-form-item-control-input">
                    <div className="ant-form-item-control-input-content">
                      <input
                        className="ant-input ant-input-lg"
                        type={"number"}
                        step="any"
                        min={0}
                        value={v.price}
                        onChange={(e) => {
                          editCommandLine({
                            key: v.key,
                            index: "price",
                            value: +e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td width="10%">
              <div className="ant-row ant-form-item" style={{ rowGap: "0px" }}>
                <div className="ant-col ant-form-item-control">
                  <div className="ant-form-item-control-input">
                    <div className="ant-form-item-control-input-content">
                      <input
                        className="ant-input ant-input-lg"
                        type={"number"}
                        min={0}
                        placeholder={v.tva ? `${v.tva}%` : "0%"}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>

            {/* Remise  */}
            <td width="10%">
              <div className="ant-row ant-form-item" style={{ rowGap: "0px" }}>
                <div className="ant-col ant-form-item-control">
                  <div className="ant-form-item-control-input">
                    <div className="ant-form-item-control-input-content">
                      <input
                        className="ant-input ant-input-lg"
                        type={"number"}
                        min={0}
                        max={100}
                        value={v.discount ? v.discount : 0}
                        onChange={(e) => {
                          editCommandLine({
                            key: v.key,
                            index: "discount",
                            value: +e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>

            {/* PU ttc */}
            <td>
              {v.price &&
                (
                  v.price +
                  (v.price * v.tva) / 100 -
                  ((v.price + (v.price * v.tva) / 100) * v.discount) / 100
                ).toFixed(3)}
            </td>

            <td>
              <span className="commandLine-total">
                {" "}
                {(
                  v.quantity * v.price -
                  ((v.quantity * v.price) / 100) * v.discount
                ).toFixed(3)}{" "}
                TND{" "}
              </span>
            </td>
            <td>
              <MinusCircleOutlined
                className="remouveIcon"
                onClick={() => removeRow(v.key)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;

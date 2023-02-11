import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Select, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/index";

const { Option } = Select;

const AdvancedSelect = ({ options = [], onChange, type }) => {
  const dispatch = useDispatch();
  const notfoundElement = (menu) => (
    <div>
      <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
        <a
          style={{
            flex: "none",
            padding: "8px",
            display: "block",
            cursor: "pointer",
          }}
          onClick={
            type === "client"
              ? () => dispatch(actions.changeVisibleClient())
              : type === "product"
              ? () => dispatch(actions.changeVisibleProduct())
              : () => dispatch(actions.changeVisible(type))
          }
        >
          <PlusOutlined /> Ajouter
        </a>
      </div>
      <Divider style={{ margin: "0px 0" }} />
      {menu}
    </div>
  );
  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
      dropdownRender={notfoundElement}
      onChange={(key,op) =>onChange(key,op)}
    >
      {options.map((v) => (
        <Option key={v.id} data={v} value={v.id}>
          {v.name}
        </Option>
      ))}
    </Select>
  );
};
export default AdvancedSelect;

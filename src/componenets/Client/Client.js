import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Radio, Input, InputNumber, Button, Upload } from "antd";
import * as actions from "../../store/actions/index";
import AdvancedSelect from "../UI/AdvancedSelect/AdvancedSelect";
import AddSimpleModal from "../AddSimpleModal/AddSimpleModal";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const Client = ({ onCreate }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const data = useSelector((state) => state.clientReducer.clientData);

  const onFinish = (values) => {
    //console.log("vls =>", values);
    if (data) dispatch(actions.updateClient(values));
    else dispatch(actions.addClient(values));
    onCreate();
    form.resetFields();
  };

  useEffect(() => {
    if (data){
      //console.log("data=>", data)
      form.setFieldsValue({
        fullName: data.fullName,
        tel: data.tel,
        email: data.email,
        codeTVA : data.codeTVA,
        Address : data.Address
      });
    }
    form.resetFields();
  }, [data]);

  return (
    <React.Fragment>
      <Form
        className="product"
        wrapperCol={{ span: 24 }}
        name="nest-messages"
        onFinish={onFinish}
        form={form}
        size="large"
        layout="horizental"
        initialValues={
          data
            ? {
                fullName: data.fullName,
                tel: data.tel,
                email: data.email,
                codeTVA : data.codeTVA,
                Address : data.Address
              }
            : null
        }
        validateMessages={validateMessages}
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="fullName"
            label="Nom et Prénom"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input placeholder="Nom et Prénom" />
          </Form.Item>

          <Form.Item
            name="Address"
            label="Adresse"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input placeholder="Adresse" />
          </Form.Item>
          <Form.Item
            name="codeTVA"
            label="Code TVA"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input placeholder="Code TVA" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label="Numéro mobile"
            name="tel"
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <InputNumber
              min={10000000}
              placeholder="Numéro mobile"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email" }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input style={{ width: "100%" }} placeholder="Email" />
          </Form.Item>
        </Form.Item>
        <Form.Item></Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 21 }}>
          <Button style={{ width: "10%" }} type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
      <AddSimpleModal />
    </React.Fragment>
  );
};
export default Client;

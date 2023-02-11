import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Radio, Input, InputNumber, Button, Upload } from "antd";
import * as actions from "../../store/actions/index";
import "./Product.css";
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
const Product = ({ onCreate }) => {
  const dispatch = useDispatch();
  const marks = useSelector((state) => state.rootReducer.marks);
  const categories = useSelector((state) => state.rootReducer.categories);
  const [type, setType] = useState("P");
  const [mark, setMark] = useState(null);
  const [category, setCategory] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [form] = Form.useForm();
  const data = useSelector(state => state.productReducer.productData);


  const onFinish = (values) => {
    //console.log("vls =>", values);
    values.CategoryId = category;
    values.MarkId = mark;
    values.image = imagePath;
    if(!data){
      dispatch(actions.createProduct(values));
    }
    else{
      dispatch(actions.updateProduct(values))
    }
    onCreate();
    form.resetFields();
    setImagePath(null);
    setCategory(null);
    setMark(null);
  };

  useEffect(() => {
    dispatch(actions.loadCategories());
    dispatch(actions.loadMarks());
  }, []);
  const getImagePath = () => {
    window.electronAPI
      .getImagePath()
      .then((result) => {
        //console.log(result);
        setImagePath(result);
      })
      .catch((e) => false );
  };


  useEffect(()=> {
    //console.log("data [product js ]" , data)
    if(data){
      form.setFieldsValue({
        designation: data.designation,
        type : data.type,
        CategoryId : data.Category,
        internal_refernce : data.internal_refernce,
        MarkId : data.Mark,
        tva : data.tva,
        buyingPrice : data.buyingPrice,
        stock :data.stock,
        description : data.description
      });
      setType(data.type)
      setMark(data.MarkId);
      setCategory(data.CategoryId)
    }else 
      form.resetFields();    
  },[data])

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
        initialValues={!data ? {
            price: 15,
            buyingPrice: 10,
            stock: 0,
            tva: 19,
            type: type
          } :
          {
            designation : data.designation,
            type : data.type,
            CategoryId : data.CategoryId,
            internal_refernce : data.internal_refernce,
            MarkId : data.MarkId,
            tva : data.tva,
            price :data.price,
            buyingPrice : data.buyingPrice,
            stock :data.stock,
            description : data.description
          }  
        
        }
        validateMessages={validateMessages}
      >
        <Form.Item
          name="type"
          label="Type"
          labelCol={{ span: 10 }}
          wrapperCol={{
            span: 6,
          }}
        >
          <Radio.Group onChange={(e) => setType(e.target.value)}>
            <Radio value="P">Produit</Radio>
            <Radio value="S">Service</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="designation"
            label="Libellé"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input placeholder="Libellé" />
          </Form.Item>
          <Form.Item
            name="CategoryId"
            label="Catégorie"
            rules={[{ required: false }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <AdvancedSelect  options={categories} onChange={(v) => setCategory(v)} type="category" />
          </Form.Item>
          <Form.Item
            label="Référence interne"
            name="internal_refernce"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(33% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input placeholder="Référence interne" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          {type === "P" ? (
            <Form.Item
              name="MarkId"
              label="Marque"
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                marginRight: "8px",
              }}
            >
              <AdvancedSelect options={marks} onChange={(v) => {
                   //console.log("hello",v);
                   setMark(v)
                }
              } type="mark" />
            </Form.Item>
          ) : null}

          <Form.Item
            name="tva"
            label="TVA"
            style={{
              display: "inline-block",
              width: "calc(20% - 8px)",
              marginRight: "8px",
            }}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: "100%" }}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
            />
          </Form.Item>
          {type === "P" ? (
            <Form.Item
              label="Référence du constructeur"
              name="manifacturer_refernce"
              rules={[{ required: false }]}
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                marginRight: "8px",
              }}
            >
              <Input placeholder="Référence du constructeur" />
            </Form.Item>
          ) : (
            <Form.Item
              name="price"
              label="Prix de vente"
              style={{
                display: "inline-block",
                width: "calc(33% - 8px)",
                marginRight: "8px",
              }}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `TND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\TND\s?|(,*)/g, "")}
              />
            </Form.Item>
          )}
        </Form.Item>
        {type === "P" ? (
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              label="Prix d'achat"
              name="buyingPrice"
              rules={[{ required: false }]}
              style={{
                display: "inline-block",
                width: "calc(33% - 8px)",
                marginRight: "8px",
              }}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `TND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\TND\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="Prix de vente"
              style={{
                display: "inline-block",
                width: "calc(33% - 8px)",
                marginRight: "8px",
              }}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `TND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\TND\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item
              name="stock"
              label="stock"
              style={{
                display: "inline-block",
                width: "calc(33% - 8px)",
                marginRight: "8px",
              }}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Form.Item>
        ) : null}
        <Form.Item>
          <Form.Item
            name="description"
            label="Description"
            style={{
              display: "inline-block",
              width: "calc(70% - 8px)",
              marginRight: "8px",
            }}
          >
            <Input.TextArea
              autoSize={{ minRows: 7 }}
              placeholder="Description"
              allowClear
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(30% - 8px)",
              marginRight: "8px",
            }}
          >
            <div className="uploader" onClick={getImagePath}>
              {!imagePath ? (
                <div style={{ marginTop: 8 }}>Télécharger image</div>
              ) : (
                <img
                  src={`file://${imagePath}`}
                  width="100%"
                  style={{ maxHeight: "250px" }}
                  alt="image"
                />
              )}
            </div>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 21 }}>
          <Button style={{ width: "10%" }} type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
      <AddSimpleModal/>
    </React.Fragment>
  );
};
export default Product;

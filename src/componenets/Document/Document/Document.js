import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import * as actions from "../../../store/actions/index";
import { Form, DatePicker, Divider, Button, Steps, message, Input } from "antd";
import moment from "moment";
import "./Document.css";
import AdvancedSelect from "../../UI/AdvancedSelect/AdvancedSelect";
import ProductList from "../ProductList/ProductList";
import AddClientModal from "../../AddClientModal/AddClientModal";
import AddProductModal from "../../AddProductModal/AddProductModal";

const Document = ({ baseTva, clients, tax, client ,tvaTable ,type}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";
  const [totalTVA , setTotalTva ] = useState(0);
  const addRow = () => {
    if (client){
      dispatch(
        actions.addCommandLine({
          key: `commandLine-${Date.now()}`,
          quantity: 1,
          price: 0,
          discount : 0
        })
      );
    }else {
      message.error("S'il vous plaît ajouter un client ");
    }
  };
  const onFinish = (values) => {
    //console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };

  useEffect(()=> { 
      //console.log(" tvaTable",tvaTable);
  },[tvaTable]);
  useEffect(()=> { 
    if (client === null){
      form.resetFields()
    }
  },[client])
  // const sendProducts =_=> {
  //     ipcRenderer.send('notify','this is my message maaaan ♥ ');
  // }

  useEffect(()=> { 
    //console.log('tvaTable ♥ => ', tvaTable.reduce((a ,c ) => a + c[2] ,0));
    setTotalTva(tvaTable.reduce((a ,c ) => a + c[2] ,0));
  },[tvaTable]);

  return (
    <React.Fragment>
      <div className="document-header">
        <img src={"file://C:/dataBases/images/logo.png"} className="logoBill" />
        <div>STE YAS LIGHTING COMPANY</div>
        <span> {type === "releaseVoucher" ? "Bon de sortie" : type === "deliveryNote" ? "Bon de sortie" : type} </span>
      </div>
      <Divider/>
      <Form
        name="basic"
        initialValues={{ date: moment(new Date())  , client :'' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        layout="horizontal"
        form={form}
      >
        <Form.Item  className="form-row">
          <Form.Item
            label="Client"
            name="client"
            style={{ width: "calc(40% - 8px)" }}
          >
            <AdvancedSelect
              options={clients.map((v) => {
                return {
                  ...v,
                  name: v.fullName,
                  id: v.id,
                };
              })}
              type="client"
              onChange={(productKey, options) => {
                dispatch(actions.changeClient(options));
                //console.log("client :=> ", options);
              }}
            />
          </Form.Item>
          <Form.Item label="Date" name="date" className='document-date'>
            <DatePicker bordered={false} onChange={(v)=>dispatch(actions.changeDate(v.toDate()))} format={dateFormat}  />
          </Form.Item>
        </Form.Item>
        {client ? (
          <ul className="client-information">
            <li>
              <b> Nom du client : </b> {client.data.fullName}
            </li>
            <li>
              <b> Adresse  : </b> {client.data.Address}
            </li>
            <li>
              <b> Code TVA : </b> {client.data.codeTVA}
            </li>
          </ul>
        ) : null}
        {
          type =='releaseVoucher' || type == 'deliveryNote' ? 
          <>
            <Form.Item
                label="Chauffeur"
                name="driver"
                style={{ width: "calc(40% - 8px)"}}
              >
                <Input onChange={e=> dispatch(actions.changeDriver(e.target.value))} />
              </Form.Item>
              <Form.Item
                label="Matricule"
                name="registrationNumber"
                style={{ width: "calc(40% - 8px)"}}
              >
                <Input onChange={e=> dispatch(actions.changeRegistrationNumber(e.target.value))} />
              </Form.Item>
          </>
          :
          null
        }

        <ProductList form={form} />
      </Form>
      <Divider />
      <div className="option-bar">
        <Button onClick={addRow} type="dashed" size={"large"}>
          {" "}
          Ajouter Produit{" "}
        </Button>
        <Button
          type="dashed"
          size={"large"}
          disabled
        >
          {" "}
          Ajouter Séparateur{" "}
        </Button>
        <Button type="dashed" size={"large"} disabled>
          {" "}
          Ajouter Sous-total{" "}
        </Button>
      </div>
      <div className={"total"}>
        <table className="base-tva">
          <thead>
            <tr>
              <th>TVA</th>
              <th>Base</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
          {tvaTable.map((v,i) => {
            if (v[0]) 
              return (<tr key={`tabTvaDocument${i}`}>
                <td>{v[0]}%</td>
                <td>{v[1].toFixed(3)} TND</td>
                <td>{v[2].toFixed(3)} TND</td>
              </tr>)
          })}
          </tbody>
        </table>
        <table className="document-total">
          <tbody>
            <tr>
              <td>Total HT</td>
              <td>{baseTva.toFixed(3)} TND</td>
            </tr>
            <tr>
              <td>TOTAL TVA</td>
              <td>{totalTVA.toFixed(3)} TND</td>
            </tr>
            <tr>
              <td>TOTAL TTC</td>
              <td>{(baseTva + totalTVA ).toFixed(3)} TND</td>
            </tr>
            {type =='Facture' ? 
              <tr>
                <td>Timbre fiscal</td>
                <td>{tax.taxStamp.toFixed(3)} TND</td>
              </tr>
            :
              null
            }
            <tr>
              <td>NET À PAYER</td>
              <td>
                {((baseTva + totalTVA ) +  ( type =='Facture' ?  tax.taxStamp : 0)).toFixed(
                  3
                )}{" "}
                TND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider style={{ backgroundColor: "black", height: "2px" }} />
      <AddClientModal />
      <AddProductModal />
    </React.Fragment>
  );
};

export default Document;
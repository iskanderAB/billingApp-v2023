import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import * as actions from "../../../store/actions/index";
import { Form, Button, Steps, message } from "antd";
import DocumentToPrint from "../DocumentToPrint/DocumentToPrint";
import Document from "../Document/Document";
import "./DocumentForm.css";

const { Step } = Steps;

const DocumentForm = ({ current, setCurrent, onCancel ,type }) => {
  const rows = useSelector((state) => state.documentReducer.commandLines);
  const client = useSelector((state) => state.documentReducer.client);
  const documents = useSelector((state) => state.documentReducer.documents)
  const clients = useSelector((state) => state.clientReducer.clients);
  const tax = useSelector((state) => state.documentReducer.tax);
  const date = useSelector((state) => state.documentReducer.date);
  const tvaTable = useSelector((state) => state.documentReducer.tvaTable);
  const driver = useSelector(state => state.documentReducer.driver);
  const registrationNumber = useSelector(state => state.documentReducer.registrationNumber)
  const [baseTva, setBaseTva] = useState(0);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const toPrint = useRef();

  useEffect(() => {
    setBaseTva(
      rows.reduce((a, c) => {
        return a + (c.price * c.quantity) - (c.price * c.quantity * c.discount / 100) ;
      }, 0)
    );
  }, [rows]);
  const steps = [
    {
      title: "Création",
      content: (
        <Document
          tvaTable={tvaTable}  
          baseTva={baseTva}
          clients={clients}
          client={client}
          tax={tax}
          type={type}
        />
      ),
    },
    {
      title: "Générer",
      content: (
        <DocumentToPrint
          CommandLines={rows}
          tax={tax}
          baseTva={baseTva}
          client={{...client}}
          date={date}
          ref={toPrint}
          type={type}
          tableTva={tvaTable}
          driver={driver}
          registrationNumber={registrationNumber}
          reference ={(documents.filter(v=> v.type ==type).length === 0 ? 1 : +documents.filter(v=> v.type ==type).reverse()[0]['reference'].split('-')[1]+1)}
        />
      ),
    },
  ];
  const onFinish = (values) => {
    //console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };

  // const sendProducts =_=> {
  //     ipcRenderer.send('notify','this is my message maaaan ♥ ');
  // }
  const sendNotification = () => {
    //console.log("electron API => ", window.electronAPI);
    window.electronAPI.saveProducts("hello iskander" + Date.now());
  };

  const next = () => {
    if (rows.length > 0 && rows.every((v) => v.product)) {
      setCurrent(current + 1);
    } else {
      message.error("s'il vous plaît mettre tous les produits");
    }
  };

  const save = () => {
    dispatch(actions.addDocument(type , baseTva, tvaTable));
    onCancel();
    dispatch(actions.cleanDocument());
    setCurrent(0);
  };
  const handlePrint = useReactToPrint({
    content: () => toPrint.current,
  });

  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      {/* <div style={{ display: "none" }}>

      </div> */}
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Créer
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              handlePrint();
              save();
            }}
          >
            Enregistrer et imprimer
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              save();
            }}
            // type="dashed"
            style={{ marginLeft: "5px" }}
          >
            Enregistrer
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              setCurrent(0);
            }}
            style={{ marginLeft: "5px" }}
          >
            Précédente
          </Button>
        )}
      </div>
      {/* <Form.Item wrapperCol={{ span: 24, offset: 21 }}>
          <Button style={{ width: "10%" }} type="primary" onClick={handlePrint} htmlType="submit">
            Créer 
          </Button>
        </Form.Item> */}
    </div>
  );
};
export default DocumentForm;

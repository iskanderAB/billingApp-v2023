import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import * as actions from "../../store/actions/index";
import PdfToPrint from "./PdfToPrint/PdfToPrint";

const PdfModal = () => {
  const visible = useSelector((state) => state.documentReducer.pdfReader);
  const document = useSelector((state) => state.documentReducer.documentToRead);
  const tax = useSelector((state) => state.documentReducer.tax);
  const dispatch = useDispatch();
  const toPrint = useRef();
  const [tableTva , setTableTva] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => toPrint.current,
  });

  useEffect(()=> { 
    if(document)
      setTableTva([...new Set(document.CommandLines.map((v) => v.tva))]
      .map((v) => {
        return [
          v,
          document.CommandLines
            .filter((element) => element.tva === v)
            .reduce(
              (p, c) =>
                p +
                (+c.price * +c.quantity -
                  (+c.price * +c.quantity * c.discount) / 100),
              0
            ),
            document.CommandLines
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
      }))
  },[document])
  useEffect(()=> {
    //console.log('tableTVA',tableTva.reduce((a ,c ) => a + c[2] ,0) , document)
  } , [tableTva])
  return (
    <Modal
      title={ document ?  `${document.type === "releaseVoucher" ? "Bon de sortie" : document.type === "deliveryNote" ? "Bon de livraison" : document.type} N° ${document.reference}` : 'Loading ... '}
      style={{ top: 20 }}
      width={800}
      visible={visible}
      footer={false}
      onCancel={() => dispatch(actions.changePdfReaderVisibility())}
    >
      <PdfToPrint {...document} tableTva={tableTva} {...tax} ref={toPrint} />
      <Button
        type="primary"
        onClick={ async() => {
          await handlePrint();
          dispatch(actions.changePdfReaderVisibility());
        }}
        style={{ marginLeft:"85%" }}
      >
        Imprimer
      </Button>
    </Modal>
  );
};
export default PdfModal;

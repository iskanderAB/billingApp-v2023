import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Modal, Radio } from "antd";
import AdvancedSelect from "../UI/AdvancedSelect/AdvancedSelect";
import DocumentForm from "../Document/DocumentForm/DocumentForm";
import Product from "../Product/Product";
import Client from "../Client/Client";

const AddModal = ({ visible, onCreate, onCancel }) => {
  const location = useLocation();
  const [current, setCurrent] = React.useState(0);


  return (
    <>
      {visible ? (
        <Modal
          visible={true}
          title={
            location.pathname === "/bill"
              ? "Création facture"
              : location.pathname === "/client"
              ? "Ajouter client"
              : location.pathname === "/product&service"
              ? "Ajouter produit"
              : location.pathname === "/Avoir"
              ? "Création avoir"
              : location.pathname === "/Avoir-Facture"
              ? "Création avoir facture"
              : location.pathname === "/quote"
              ? "Création devis"
              : location.pathname === "/release-voucher"
              ? "Création Bon de sortie"
              : location.pathname === "/delivery-note"
              ? "Création Bon de livraison"
              : null
          }
          okText="Create"
          cancelText="Cancel"
          width={1000}
          bodyStyle={{
            minHeight: location.pathname === "/client" ? "30vh" : "70vh",
          }}
          footer={false}
          onCancel={() => {
            onCancel();
            setCurrent(0);
          }}
        >
          {location.pathname === "/client" ? (
            <Client onCreate={onCreate} />
          ) : location.pathname === "/bill" ? (
            <DocumentForm
              current={current}
              setCurrent={setCurrent}
              onCancel={onCancel}
              type={"Facture"}
            />
          ) : location.pathname === "/Avoir" ? (
            <DocumentForm
              current={current}
              setCurrent={setCurrent}
              onCancel={onCancel}
              type={"Avoir"}
            />
          ) : location.pathname === "/Avoir-Facture" ? (
            <DocumentForm
              current={current}
              setCurrent={setCurrent}
              onCancel={onCancel}
              type={"Avoir-Facture"}
            />
          ) : location.pathname === "/delivery-note" ? (
            <DocumentForm
              current={current}
              setCurrent={setCurrent}
              onCancel={onCancel}
              type={"deliveryNote"}
            />
          ) : location.pathname === "/release-voucher" ? (
            <DocumentForm
              current={current}
              setCurrent={setCurrent}
              onCancel={onCancel}
              type={"releaseVoucher"}
            />
          ) : location.pathname === "/quote" ? (
            <DocumentForm
              current={current}
              setCurrent={setCurrent}
              onCancel={onCancel}
              type={"Devis"}
            />
          ) : location.pathname === "/product&service" ? (
            <Product onCreate={onCreate} />
          ) : null}
        </Modal>
      ) : null}
    </>
  );
};
export default AddModal;

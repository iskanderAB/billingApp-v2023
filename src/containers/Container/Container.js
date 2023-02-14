import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Layout, Popconfirm, Popover } from 'antd'
import DataTable from '../../componenets/DataTable/DataTable'
import ToolsBar from '../../componenets/ToolsBar/ToolsBar'
import productColumns from '../../componenets/columns/productServiceColumns'
import clientColumns from '../../componenets/columns/clientColumns'
import documentColumns from '../../componenets/columns/document'
import * as actions from '../../store/actions/index'
import PdfModal from '../../componenets/PdfModal/PdfModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faTools,
  faFilePdf,
  faSyncAlt,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons'
import AddClientModal from '../../componenets/AddClientModal/AddClientModal'
import { Tag } from 'antd'
import './Container.css'
import AddProductModal from '../../componenets/AddProductModal/AddProductModal'
import Dashboard from '../Dashboard/Dashboard'
import PaymentsModal from '../../componenets/PaymentsModal/PaymentsModal'
import moment from 'moment'

const { Content } = Layout

const Container = ({ data }) => {

  const [paymentsModal, setPaymentsModal] = useState(false);
  const products = useSelector((state) => state.productReducer.products)
  const clients = useSelector((state) => state.clientReducer.clients)
  const documents = useSelector((state) => state.documentReducer.documents)
  const txtSearch = useSelector((state) => state.rootReducer.txtSearch)
  const [client, setClient] = useState(null);
  const dispatch = useDispatch()

  const switchToDocument = (recordId, documentType) => {
    dispatch(actions.switchDocumentType(recordId, documentType))
  }

  // on bascule between documents for exemple from bon de livreson to
  const PopoverContent = (type,id) => {
    if (type === 'deliveryNote')
      return (
        <div>
          <a
            className="switchItem"
            onClick={() => switchToDocument(id, 'Facture')}
          >
            Facture
          </a>
        </div>
      )
    return null
  }

  documentColumns.map((v) => {
    if (v.key === 'operation') {
      v.render = (_, record) => (
        <div className="operation">
          <Popover
            placement="bottomRight"
            title={'Basculer vers'}
            content={() => PopoverContent(record.type,record.id)}
            trigger="click"
          >
            <FontAwesomeIcon
              icon={faSyncAlt}
              className="delete-icon"
              size="lg"
            />
          </Popover>
          <FontAwesomeIcon
            icon={faFilePdf}
            className="pdf-icon"
            size="lg"
            onClick={async () => {
              await dispatch(actions.getDocumentById(record.id))
              dispatch(actions.changePdfReaderVisibility())
            }}
          />
          <Popconfirm
            title="Assurez-vous de supprimer?"
            okText="Oui"
            cancelText="Non"
            onConfirm={() => dispatch(actions.deleteDocument(record.id))}
          >
            <FontAwesomeIcon icon={faTrash} className="delete-icon" size="lg" />
          </Popconfirm>
        </div>
      )
    } else if (v.key === 'date') {
      v.render = (v, record) => moment(v).format("D/M/Y")
    }
    return v
  })

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{data}</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ minHeight: 600 }}>
        <ToolsBar />
        <div className="subContainer">
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/Avoir">
              <DataTable
                data={documents
                  .filter(
                    (v) =>
                      v.type === 'Avoir' &&
                      (v.Person.includes(txtSearch) ||
                        v.date.toString().includes(txtSearch)),
                  )
                  .reverse()}
                columns={documentColumns}
              />
            </Route>
            <Route path="/Avoir-Facture">
              <DataTable
                data={documents
                  .filter(
                    (v) =>
                      v.type === 'Avoir-Facture' &&
                      (v.Person.includes(txtSearch) ||
                        v.date.toString().includes(txtSearch)),
                  )
                  .reverse()}
                columns={documentColumns}
              />
            </Route>
            <Route path="/release-voucher">
              <DataTable
                data={documents
                  .filter(
                    (v) =>
                      v.type === 'releaseVoucher' &&
                      (v.Person.includes(txtSearch) ||
                        v.date.toString().includes(txtSearch)),
                  )
                  .reverse()}
                columns={documentColumns}
              />
            </Route>
            <Route path="/delivery-note">
              <DataTable
                data={documents
                  .filter(
                    (v) =>
                      v.type === 'deliveryNote' && v.Person.includes(txtSearch),
                  )
                  .reverse()}
                columns={documentColumns}
              />
            </Route>
            <Route path="/bill">
              <DataTable
                data={documents
                  .filter(
                    (v) => v.type === 'Facture' && v.Person.includes(txtSearch)
                  )
                  .reverse()}
                columns={documentColumns}
              />
            </Route>
            <Route path="/client">
              <DataTable
                columns={clientColumns.map((v) => {
                  if (v.key === 'operation')
                    v.render = (_, record) => (
                      <div className="operation">
                        <FontAwesomeIcon
                          icon={faTools}
                          size="lg"
                          className="edit-icon"
                          onClick={() =>
                            dispatch(actions.changeVisibleClient(record))
                          }
                        />
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          size="lg"
                          className="payment-icon"
                          onClick={
                            () => {
                              setPaymentsModal(true);
                              setClient(record); 
                            }                            
                          }
                        />
                        <Popconfirm
                          title="Assurez-vous de supprimer?"
                          okText="Oui"
                          cancelText="Non"
                          onConfirm={() =>
                            dispatch(actions.deleteClient(record.id))
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            size="lg"
                          />
                        </Popconfirm>
                      </div>
                    )
                  return v
                })}
                data={clients
                  .filter(
                    (v) => v.fullName.includes(txtSearch),
                    //FIXME
                    // v.tel.toString().includes(txtSearch) ||
                    // v.email.includes(txtSearch)
                  )
                  .reverse()}
              />
            </Route>
            <Route path="/product&service">
              <DataTable
                columns={productColumns.map((v) => {
                  if (v.key === 'operation')
                    v.render = (_, record) => (
                      <div className="operation">
                        <FontAwesomeIcon
                          icon={faTools}
                          size="lg"
                          className="edit-icon"
                          onClick={() =>
                            dispatch(actions.changeVisibleProduct(record))
                          }
                        />
                        <Popconfirm
                          title="Assurez-vous de supprimer?"
                          okText="Oui"
                          cancelText="Non"
                          onConfirm={() =>
                            dispatch(actions.deleteRecord(record.id))
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            size="lg"
                          />
                        </Popconfirm>
                      </div>
                    )
                  if (v.key === 'Category') {
                    const filtredCategory = [
                      ...new Set(
                        products
                          .map((v) => v.Category)
                          .filter((v) => typeof v === 'string'),
                      ),
                    ].map((v) => {
                      return {
                        text: v,
                        value: v,
                      }
                    })
                    v.filters = filtredCategory
                    v.onFilter = (value, record) => {
                      //console.log(record)
                      if (typeof record.Category === 'string')
                        return record.Category.startsWith(value)
                    }
                    v.filterSearch = true
                  }
                  if (v.key === 'Mark') {
                    const filtredMark = [
                      ...new Set(
                        products
                          .map((v) => v.Mark)
                          .filter((v) => typeof v === 'string'),
                      ),
                    ].map((v) => {
                      return {
                        text: v,
                        value: v,
                      }
                    })
                    v.filters = filtredMark
                    v.onFilter = (value, record) => {
                      //console.log(record)
                      if (typeof record.Mark === 'string')
                        return record.Mark.startsWith(value)
                    }
                    v.filterSearch = true
                  }
                  return v
                })}
                data={products
                  .filter((v) => {
                    return v.designation.includes(txtSearch)
                  })
                  .reverse()}
              />
            </Route>
            <Route path="/payments">
                  <p> payments  </p>
            </Route>
          </Switch>
        </div>
      </div>
      <PdfModal />
      <AddClientModal />
      <AddProductModal />
      <PaymentsModal visibility={paymentsModal} 
        setVisibility={setPaymentsModal} 
        clientId={client?.id}
        fullName={client?.fullName}
        codeTVA={client?.codeTVA}
        Address={client?.Address}
        clients={clients}
      />
    </Content>
  )
}
export default Container;
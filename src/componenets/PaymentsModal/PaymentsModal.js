import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import './paymentsModal.css';
import { MinusCircleOutlined } from "@ant-design/icons";
import * as actions from '../../store/actions/index'
import moment from 'moment';
import 'antd/dist/antd.css';
import { Steps, Button, message } from 'antd';
import ListePayments from '../ListePayments/ListePayments';
import { useReactToPrint } from "react-to-print";
const { Step } = Steps;
const PaymentsModal = ({ visibility, setVisibility ,clientId, clients,fullName,Address,codeTVA}) => {
  const documents = useSelector((state) => state.documentReducer.documents);
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState(''); 
  const [chequeState,setChequeState] = useState(true);
  const toPrint = useRef();

  const dispatch = useDispatch();

  const changeVisibility = () => {
    setStartDate('');
    setEndDate('');
    setVisibility(false)
  }

  const handlePrint = useReactToPrint({
    content: () => toPrint.current,
  });

  const sortCallback = (a, b) => {
    const date1 = moment(a.date).format('YYYY-MM-DD')
    const date2 = moment(b.date).format('YYYY-MM-DD')
    if (date1 == date2 && !a.reference)
      // yelzem el daf3 ykon akher haja fel tartib
      return 1

    return moment(a.date).valueOf() - moment(b.date).valueOf() > 0 ? 1 : -1
  }

  const calculeRest = (priceArray, index) => {
    let som = 0
    for (let i = 0; i <= index; i++) {
      if (priceArray[i]['TTC'] ){ 
          if(priceArray[i]['type'] === 'Avoir'){
            som -= +priceArray[i]['TTC'];
          }
          else{
            som += +priceArray[i]['TTC'];
          }
      }
      else {
        som -= +priceArray[i]['amount']
      }
    }
    return som
  }

  const addRow = (e) => {
    e.preventDefault()
    const { date, amount ,typePayments ,checkNum,checkName,checkDate } = e.target.elements

    if (date.value == null) {
      date.value = new Date()
    }
    dispatch(actions.addPayments(date.value,amount.value,clientId,typePayments.value ,checkNum?.value,checkName?.value,checkDate?.value));
  }

  const removeRow= (id,PersonId) => { 
    dispatch(actions.removePayments(id,PersonId));
  }
  useEffect(() => {

  },[documents])

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };  
  const steps = [
    {
      title: 'Affichage',
        content: (<div>
          <form onSubmit={addRow}>
            <input
              type="date"
              id="date"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
            <input
              type="number"
              id="amount"
              step="any"
              required
              min={0}
              placeholder="Le montant payé"
            />
            <select name="typePayments"
              id="typePayments"
              onChange={(v)=>{
                if(v.target.value === 'chèque' || v.target.value === 'effet' )
                  setChequeState(true)
                else
                  setChequeState(false)
               }
              }
              >
              <option value="chèque">chèque</option>
              <option value="espèces"> espèces</option>
              <option value="effet">effet</option>
            </select>
            {
             chequeState ?
              <div style={{dispaly: "block"}}>
                <input type='text' id="checkNum" placeholder='numéro de cheque'/>
                <input type='text' id="checkName" placeholder='nom de cheque '/>
                <input type='date' id="checkDate" placeholder='date  de cheque ' defaultValue={new Date().toISOString().split('T')[0]}/>
              </div>
              :
              null
            } 
            <button> Ajouter </button>
          </form>
          <label> filter :  </label>
          <input type='date' value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
          <input type='date' value={endDate} onChange={(e)=> setEndDate(e.target.value)} />
          <table className="payments">
            <thead>
              <tr>
                <th>Date</th>
                <th>Document</th>
                <th>TTC par facture</th>
                <th>Type de paiement</th>
                <th>num de chèque</th>
                <th>nom de chèque</th>
                <th>date de chèque</th>
                <th>Montant payé</th>
                <th>Reste</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 && clients.find(c=> c.id == clientId) ? 
                [ ...documents.filter(v=> {
                    return v.PersonId == clientId &&  v.type !== 'releaseVoucher'
                }),
                  ...clients.find(c=> c.id == clientId)?.Payments
                ].sort(sortCallback).map((v, i, array) => (
                  <tr
                    hidden={(!endDate || !startDate)?
                              false
                            : endDate && startDate && moment(v.date).isBetween(startDate,endDate)?
                              false
                            :
                              true
                          }
                    key={`historyDoc-${i}`}
                    style={{
                      height: '40px',
                      backgroundColor: v.reference && v.type === 'Avoir'? 
                      '#a7ddfc' : v.reference ? '#ffc9c9' : '#d4efdf',
                    }}
                  >
                    <td>{moment(v.date).format('DD/MM/YYYY') || '-'}</td>
                    <td>{v.reference || '-'}</td>
                    <td>{v.TTC  || '-'}</td>
                    <td>{!v.reference ? v.type : '-'} </td>
                    <td>{v.checkNum ? v.checkNum : '-' }</td> 
                    <td>{v.checkNum ? v.checkName : '-' }</td>
                    <td>{v.checkNum ? v.checkDate : '-' }</td>
                    <td>{!v.reference ? v.amount.toFixed(3) : '-'} </td>
                    <td>{calculeRest(array, i).toFixed(3)}</td>
                    <td style={{
                      textAlign: 'center'
                    }}>
                      {
                        !v.reference ? 
                          <MinusCircleOutlined
                            className="remouveIcon"
                            onClick={() => removeRow(v.id, v.PersonId)}
                          />
                        :
                        "-" 
                      }
                    </td>
                  </tr>
                ))
              :
              null
            }
              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
        </div> ),
    },
    {
      title: 'Imprimer',
      content: (
        <ListePayments
          calculeRest={calculeRest}
          sortCallback={sortCallback}
          clientId={clientId}
          documents={documents.filter(v => v.type !== 'releaseVoucher')}
          clients={clients}
          ref={toPrint}
          fullName={fullName}
          startDate={startDate}
          endDate={endDate}
          codeTVA={codeTVA}
          Address={Address}
        />),
    },
  ];
  return (
    <Modal
      title={`Historique de paiments : ${fullName}`}
      style={{ top: 20 }}
      width={800}
      visible={visibility}
      footer={false}
      onCancel={changeVisibility}
    >
<>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Suivante
          </Button>
        )}
        {current > 0 && (
          <>
            <Button style={{ margin: '0 8px' }} type="primary" onClick={() => prev()}>
              {"<"}Précédente
            </Button>
            <Button onClick={async ()=>{
              await handlePrint();
            }}>
              Iprimer
            </Button>

          </>
        )}
      </div>

    </>
    </Modal>
  )
}
export default PaymentsModal

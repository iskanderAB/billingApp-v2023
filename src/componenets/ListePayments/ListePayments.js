import moment from 'moment'
import React, { Component } from 'react'

export default class ListePayments extends Component {
  render() {
    return (
        <div style={{padding : "20px"}}>
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          textAlign: 'left'
        }}>
          <div>
              <p>client : {this.props.fullName}</p>    
              <p>code TVA : {this.props.codeTVA}</p>
              <p>Address : {this.props.Address}</p>
          </div> 
          <div
            style={{
              fontSize: "12px",
              fontStyle: "oblique",
              width: "46%",
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              lineHeight: "5px",
              padding: "20px",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              {" "}
              STE YAS LIGHTING COMPANY
            </p>
            <p> RUE EL ITTIHAD EL ALIA </p>
            <p> Contact : 52666686 / 93330239 </p>
            <p> MF : 1727277 / ZBM000 </p>
            <p> CD :1727277 / Z </p>
          </div>
        </div>
        <table style={{width: '100%'}} >
          <thead>
            <tr style={{border: "1px solid rgb(155, 155, 155)"}}>
              <th style={{border: "1px solid rgb(155, 155, 155)"}} >Date</th>
              <th style={{border: "1px solid rgb(155, 155, 155)"}} >Document</th>
              <th style={{border: "1px solid rgb(155, 155, 155)"}} >TTC par facture</th>
              <th style={{border: "1px solid rgb(155, 155, 155)"}} >Montant payé</th>
              <th style={{border: "1px solid rgb(155, 155, 155)"}} >Reste</th>
              <th style={{border: "1px solid rgb(155, 155, 155)"}} >Type de paiement</th>
            </tr>
          </thead>
          <tbody>
            {this.props.clients.length > 0 ? 
              this.props.clients.find(c=> c.id == this.props.clientId) && [...this.props.documents.filter(v=> {
                return v.PersonId == this.props.clientId
              })
                ,...this.props.clients.find(c=> c.id == this.props.clientId).Payments
              ].sort(this.props.sortCallback).map((v, i, array) => (
                <tr
                hidden={(!this.props.endDate || !this.props.startDate)?
                  false
                : this.props.endDate && this.props.startDate && moment(v.date).isBetween(this.props.startDate,this.props.endDate)?
                  false
                :
                  true
              }
                  key={`historyDoc-${i}`}
                  style={{
                    height: '40px',
                    backgroundColor: v.reference ? '#ffc9c9' : '#d4efdf',
                  }}
                >
                  <td>{moment(v.date).format('DD/MM/YYYY') || '-'}</td>
                  <td>{v.reference || '-'}</td>
                  <td>{v.TTC  || '-'}</td>
                  <td>{!v.reference ? v.amount.toFixed(3) : '-'} </td>
                  <td>{this.props.calculeRest(array, i).toFixed(3)}</td>
                  <td>{!v.reference ? v.type : '-'} </td>
                </tr>
              ))
            :
            null
          }
            <tr></tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

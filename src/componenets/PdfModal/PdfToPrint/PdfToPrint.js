import React, { Component } from "react";
import moment from "moment";
import { Divider } from "antd";

class PdfToPrint extends Component {

  componentDidMount(){
    //console.log('props => ' ,this.props );
  }
  render() {
    const style = {
      border: "1px solid black",
      borderCollapse: "collapse",
      padding : 0
    }

    return (
      <div style={{ padding: "10px" }}>
        <div
          // className="document-header-print"
          style={{
            display: "flex",
          }}
        >
          {/* <img src={window.location.origin + '/logo.jpg'} className="logoBill"  */}
          <div 
            style={{
                fontSize: "12px",
                fontStyle: "oblique",
                width : '46%',
                fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                border : "solid 2px black",
                lineHeight : '5px',
                padding : '20px'
            }}
          >
          <p style={{ fontWeight: "bold",fontSize: "16px",}} > STE YAS LIGHTING COMPANY</p>
          <p> RUE EL ITTIHAD EL ALIA </p>
          <p> Contact : 52666686 / 93330239 </p>
          <p> MF : 1727277 / ZBM000 </p>
          <p> CD :1727277 / Z </p>
          </div>
          <div
              style={{
                width: "50%",
                height : "50px",
                minWidth: "10rem",
                padding : "10px"
              }}>
            <img
              src={"file://C:/dataBases/images/logo.png"}
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
        <div style={{
          fontSize :'13px',
          fontWeight : 'bold',
          textAlign : "left",
          paddingInline : '10px',
          paddingTop :'20px'
        }}>
          <p>
            {" "}
            {this.props.type === "releaseVoucher"
              ? "Bon de sortie"
              : this.props.type === "deliveryNote"
              ? "Bon de livraison"
              : this.props.type}{" "}
            N° {this.props.reference}{" "}
          </p>
         <p
            style={{
              fontSize: "small",
              marginRight: "60px",
              height: "min-content",
            }}
          >
            {" "}
            Date : {moment(this.props.date).format("DD/MM/YYYY")}
          </p>
        </div>  
          <ul
            style={{
              listStyleType: "none",
              textAlign: "left",
              border: "solid 2px black",
              width: "50%",
              marginLeft: "30px",
              fontSize: "small",
              paddingInline : "10px",
              paddingTop : '20px',
              paddingBottom : '20px'
            }}
          >
            <li>
              <b> Nom du client : </b> {this.props.Person.fullName}
            </li>
            <li>
              <b> Adresse : </b> {this.props.Person.Address || "--"}
            </li>
            <li>
              <b> Code TVA : </b> {this.props.Person.codeTVA || "--"}
            </li>
          </ul>

        </div>
        <table
          // className="productListForm billProductList table-bordred"
          border="1"
          style={{
            width: " 100%",
            margin: "auto",
            border: "1px solid black",
            // borderTop: "black solid 4px ",
            //border: "none",
            // paddingInline: "10px",
            // verticalAlign: "middle",
            minHeight: "550px",
            paddingTop : 0,
            fontSize : "12px",
            border: "black solid 1px",
            ...style
          }}
        >
          <thead>
            <tr style={style}>
              <th
                style={{
                  height: "20px",
                  // border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span> Ref </span>
              </th>
              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span> Désignation </span>
              </th>
              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span>Quantité</span>
              </th>
              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span>Prix HT</span>
              </th>
              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span> TVA </span>
              </th>

              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span> Remise  </span>
              </th>
              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span> PU net TTC </span>
              </th>
              <th
                style={{
                  height: "20px",
                  //border: "none",
                  paddingInline: "10px",
                  verticalAlign: "middle",
                  ...style
                }}
              >
                <span> Total HT </span>
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
               <td
                style={{
                    
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`internal_reference-pdf-${i}`}> {v.internal_reference} </p>)}    
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`designation-pdf-${i}`}>{v.designation} </p>)} 
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                 {this.props.CommandLines.map((v, i) =><p key={`quantity-pdf-${i}`}> {v.quantity} </p>)} 
                 
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`price-pdf-${i}`}> {v.price.toFixed(3)} </p>)} 
                  
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`tva-pdf-${i}`}>{v.tva} % </p>)} 
                 
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`discount-pdf-${i}`}>{v.discount} % </p>)} 
                 
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`priceNetTTC-pdf-${i}`}> {v.price && (v.price + (v.price*v.tva/100) - ((v.price + (v.price*v.tva/100)) * v.discount/100)).toFixed(3)} TND  </p>)} 
                
                </td>
                <td
                  style={{
                    paddingLeft : '2px',
                    verticalAlign: 'top'
                    //border: "none",
                  }}
                >
                {this.props.CommandLines.map((v, i) =><p key={`price&quantity-pdf-${i}`}> {((v.quantity * v.price) - (((v.quantity * v.price)/100)*v.discount)).toFixed(3)} TND  </p>)} 
                
                </td>
          </tr>
          </tbody>
        </table>

        <div style={{ display: "flex" }}>
          <table
            className="base-tva"
            style={{
              margin: "2rem auto",
              border: "1px solid #bebebe",
              borderTop: "black solid 4px",
              width: "35%",
              height: "min-content",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            <thead style={{ backgroundColor: "#e9e9e9" }}>
              <tr>
                <th>TVA</th>
                <th>Base</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {this.props.tableTva.map((v, i) => {
                if (v[0])
                  return (
                    <tr key={`tableTva${i}`}>
                      <td>{v[0]}%</td>
                      <td>{v[1].toFixed(3)} TND</td>
                      <td>{v[2].toFixed(3)} TND</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
          <table
            // className="document-total"
            style={{
              margin: "2rem auto",
              border: "1px solid #bebebe",
              borderTop: "black solid 4px",
              width: "35%",
              borderTop: "black solid 4px",
              // height: "15rem",
            }}
          >
            <tbody>
              <tr>
                <td>Total HT</td>
                <td> {this.props.PHT.toFixed(3)} TND</td>
                
              </tr>
              <tr>
                <td>TOTAL TVA</td>
                <td>
                  {this.props.tableTva.reduce((a, c) => a + c[2], 0).toFixed(3)}{" "}
                  TND
                </td>
              </tr>
              <tr>
                <td>TOTAL TTC</td>
                <td> {this.props.TTC.toFixed(3)} TND</td>
              </tr>

              {this.props.type =='Facture' ? 
              <tr>
                <td>Timbre fiscal</td>
                <td>{this.props.taxStamp.toFixed(3)} TND</td>
              </tr>
            :
              null
            }
            
              <tr style={{fontWeight: 'bold' , border :"black solid 1px"}}>
                <td >NET À PAYER</td>
                <td>{(this.props.TTC + (this.props.type =='Facture' ? this.props.taxStamp : 0)).toFixed(3)} TND</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p
          style={{
                fontSize: "13px",
                paddingLeft : '80px',
                marginTop : "-20px",
                marginBottom :'20px'
              }}
            >
              Signature service commercial
            </p>
      {this.props.type === "releaseVoucher" || this.props.type === "deliveryNote"?
      <>
          <p style={{fontSize: "12px"}}> Chauffeur :  {this.props.driver} </p>   
          <p style={{fontSize: "12px"}}> Matricule :  {this.props.registrationNumber}  </p>
      </>
      :
      null
      }        
      </div>
    );
  }
}

export default PdfToPrint;

import React from 'react';
import styled from 'styled-components';

type InvoiceItem = {
    description: string;
    quantity: number;
    price: number;
  };
  
  type InvoiceData = {
    invoiceNumber: string;
    clientName: string;
    clientAddress: string;
    items: InvoiceItem[];
  };
  
const Invoice: React.FC<{ invoiceData: InvoiceData }> = ({ invoiceData }) => {
  const calculateTotal = () => {
    return invoiceData.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  return (
    <InvoiceContainer>
      <Header>
        <Logo src="/path/to/logo.png" alt="Logo" />
        <h1>Invoice #{invoiceData.invoiceNumber}</h1>
      </Header>

      <ClientInfo>
        <h3>Client Information</h3>
        <p>{invoiceData.clientName}</p>
        <p>{invoiceData.clientAddress}</p>
      </ClientInfo>

      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>{calculateTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </InvoiceContainer>
  );
};

const InvoiceContainer = styled.div`
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 800px;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
`;

const ClientInfo = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }

  tfoot {
    font-weight: bold;
  }
`;

export default Invoice;

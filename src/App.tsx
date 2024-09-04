import React, { useState } from 'react';
import styled from 'styled-components';
import Invoice from './Invoice';

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

const App: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    clientName: '',
    clientAddress: '',
    items: [{ description: '', quantity: 1, price: 0 }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedItems = invoiceData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You could implement further logic here, such as generating a PDF.
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoiceData.invoiceNumber}
          onChange={handleFormChange}
        />
        <Input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={invoiceData.clientName}
          onChange={handleFormChange}
        />
        <Input
          type="text"
          name="clientAddress"
          placeholder="Client Address"
          value={invoiceData.clientAddress}
          onChange={handleFormChange}
        />

        {invoiceData.items.map((item, index) => (
          <div key={index}>
            <Input
              type="text"
              name="description"
              placeholder="Item Description"
              value={item.description}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button type="submit">Generate Invoice</Button>
      </Form>

      <Invoice invoiceData={invoiceData} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

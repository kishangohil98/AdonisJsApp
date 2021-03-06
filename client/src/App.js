import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UpdateDialog from "./UpdateDialog";

function App() {
  const [product_data, setproduct_data] = useState([]);
  const [add_pro_toggler, setadd_pro_toggler] = useState(false);
  const [form_data, setform_data] = useState({
    p_name: "",
    p_quantity: "",
    p_uprice: "",
  });
  const [update_data, setupdate_data] = useState({
    p_id: "",
    p_name: "",
    p_quantity: "",
    p_uprice: "",
  });
  const [show, setShow] = useState(false);

  const onChangeData = (e) => {
    setform_data({
      ...form_data,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const onChngeUpdate = (e) => {
    setupdate_data({
      ...update_data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get("/api/store", config);
      console.log(res.data);
      setproduct_data(res.data);
    };
    fetchData();
  }, []);

  const submit_data = async (e) => {
    e.preventDefault();
    console.log("submit called");
    const body = JSON.stringify({
      product_name: form_data.p_name,
      quantity: form_data.p_quantity,
      unit_price: form_data.p_uprice,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post("/api/store", body, config);
    setproduct_data(res.data);
    setadd_pro_toggler(false);
  };

  const deleteAction = async (id) => {
    console.log("delete called ", id);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.delete(`/api/store/${id}`, config);
    setproduct_data(res.data);
  };

  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="#home">Product Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Form inline>
          <Button
            variant="primary"
            onClick={() => setadd_pro_toggler(!add_pro_toggler)}
          >
            Add Product
          </Button>
        </Form>
      </Navbar>

      <Container>
        {add_pro_toggler ? (
          <form className="pt-5" onSubmit={(e) => submit_data(e)}>
            <h4>Add Product Here</h4>
            <input
              onChange={(e) => onChangeData(e)}
              required
              className="mr-2"
              name="p_name"
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              onChange={(e) => onChangeData(e)}
              required
              className="mr-2"
              name="p_quantity"
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              onChange={(e) => onChangeData(e)}
              required
              className="mr-2"
              name="p_uprice"
              placeholder="Unit Price"
              required
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        ) : (
          <></>
        )}
        <h3 className="text-center pt-4">Products</h3>
        {product_data.length ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product_data.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.product_name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.unit_price}</td>
                  <td>&#x20B9; {p.total_price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteAction(`${p.id}`)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm ml-2"
                      onClick={() => {
                        setupdate_data({
                          p_id: p.id,
                          p_name: p.product_name,
                          p_quantity: p.quantity,
                          p_uprice: p.unit_price,
                        });
                        setShow(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Loading..</p>
        )}
      </Container>
      <UpdateDialog
        show={show}
        setShow={setShow}
        update_data={update_data}
        setupdate_data={setupdate_data}
        onChngeUpdate={onChngeUpdate}
        setproduct_data={setproduct_data}
      />
    </div>
  );
}

export default App;

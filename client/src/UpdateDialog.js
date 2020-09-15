import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const UpdateDialog = ({
  show,
  setShow,
  update_data,
  setupdate_data,
  onChngeUpdate,
  setproduct_data,
}) => {
  const updateTable = async (e) => {
    e.preventDefault();
    console.log("Update data called");
    const body = JSON.stringify({
      id: update_data.p_id,
      product_name: update_data.p_name,
      quantity: update_data.p_quantity,
      unit_price: update_data.p_uprice,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put("/api/store", body, config);
    setproduct_data(res.data);
    setShow(false);
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        setupdate_data({
          p_id: "",
          p_name: "",
          p_quantity: "",
          p_uprice: "",
        });
        setShow(false);
      }}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Product Update Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="p_name"
              onChange={(e) => onChngeUpdate(e)}
              required
              value={update_data.p_name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="p_quantity"
              required
              onChange={(e) => onChngeUpdate(e)}
              value={update_data.p_quantity}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              name="p_uprice"
              required
              onChange={(e) => onChngeUpdate(e)}
              value={update_data.p_uprice}
            />
          </Form.Group>

          <button
            onClick={(e) => updateTable(e)}
            className="btn btn-success btn-sm"
          >
            Update Product
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDialog;

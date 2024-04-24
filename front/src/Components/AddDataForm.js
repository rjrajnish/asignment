import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/esm/Table';
import { createNewDataAPI, getCountAPI, getDataAPI, updateByIdAPI } from '../API';

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({
    title: '',
    content: ''
  });
  const [data, setData] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [countAdd, setCountAdd] = useState(0);
  const [countUpdate, setCountUpdate] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error message when input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    let isValid = true;
    const newErrors = {};
    if (formData.title.trim() === '') {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    if (formData.content.trim() === '') {
      newErrors.content = 'Content is required';
      isValid = false;
    }
    setErrors(newErrors);

    // If form is valid, perform appropriate action (create/update)
    if (isValid) {
      if (updateId) {
        // If updateId is set, update existing data
        try {
          await updateByIdAPI(updateId, formData);
          fetchData(); // Refresh data after updating
          fetchCountData()  // Refresh data after updating
          setUpdateId(null); // Reset updateId after update
        } catch (error) {
          console.error('Error updating data:', error);
        }
      } else {
        // If updateId is not set, create new data
        try {
          await createNewDataAPI(formData);
          fetchData(); // Refresh data after creating
          fetchCountData()
        } catch (error) {
          console.error('Error adding data:', error);
        }
      }
      // Reset form fields
      setFormData({
        title: '',
        content: ''
      });
    }
  };

  // Handle update button click
  const handleUpdateClick = (item) => {
    setFormData({
      title: item.title,
      content: item.content
    });
    setUpdateId(item._id); // Set updateId to the ID of the item being updated
  };

  // get all data
  const fetchData = async () => {
    try {
      const response = await getDataAPI()
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // fetch count data
  const fetchCountData = async () => {
    try {
      const response = await getCountAPI()
      setCountAdd(response.data.data.addCount)
      setCountUpdate(response.data.data.updateCount)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData();
    fetchCountData()
  }, []);


  return (
    <>
      <Card className='col-md-6 mx-auto'>
        <Card.Body>
          <Card.Title>{updateId ? 'Update Data' : 'Add Data'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
              {errors.content && <Form.Text className="text-danger">{errors.content}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit">
              {updateId ? 'Update' : 'Add'}
            </Button>
          </Form>

        </Card.Body>
      </Card>
      <Card className='col-md-6 mx-auto'>
        <h5>Data Table</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                  <Button variant="info" onClick={() => handleUpdateClick(item)}>
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Card className='col-md-6 mx-auto'>
        <Card.Body>
          <Card.Title>API Call Counts</Card.Title>
          <Card.Text>
            Add API calls: {countAdd}
          </Card.Text>
          <Card.Text>
            Update API calls: {countUpdate}
          </Card.Text>
        </Card.Body>
      </Card></>
  );
};

export default AddDataForm;

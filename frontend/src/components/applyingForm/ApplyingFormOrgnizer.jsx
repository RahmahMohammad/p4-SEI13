import React, { useState, useEffect } from 'react'
import { MDBRow, MDBCol } from 'mdbreact';
import { MDBContainer, MDBBtn, MDBInput, MDBFormInline } from 'mdbreact';
import { Alert } from 'react-bootstrap'

import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from '../../utility/apiConfig'


export default function ApplyingForm(props) {

  const [formData, setFormData] = useState({
    shifts: []
  });

  const { _id } = props.auth.currentUser;
  const history = useHistory();
  const { id } = useParams()
  const [error, setError] = useState(false);//prevent page from collapse
  const [applingform, setApplingform] = useState({
    shifts: [''],

  })

  useEffect(() => {
    axios.get(`${API_URL}/api/events/AppliyingForm`)
      .then(res => {
        let event = res.data.msg.find(ele => ele.event._id == id)
        setApplingform(event)
      })
      .catch((err) => {
        setError("Somthing is wrong")
      });
  }, [])


  const onChangeInput = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  // to add the user info to database
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/events/applyingForm/${applingform._id}`, { formData, orgnizer: _id })//{ formData, user: props.user }
      .then((res) => {
        history.push("/MyAppliedForm");
      })
      .catch((err) => {
        setError("Somthing is wrong")
      });

    //to clear the form
    document.getElementById('myform').reset();
  }


  const shifts = applingform.shifts.map(ele => {
    return <MDBInput
      name="shift" value={ele}
      label={ele}
      type='radio'
      id='radio1'
      containerClass='mr-5'
      onChange={onChangeInput}
    />
  })


  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <MDBContainer>
          <br />
          <br />
          <MDBRow className="justify-content-center">
            <MDBCol md="7">
              <form id="myform">
                <p className="h2 text-center mb-2">Applying Form</p>
                <br />

                <div className="d-flex flex-nowrap example-parent">
                  <div className="w-100 p-3" >
                    <p>Description:  <strong>{applingform.description}</strong></p>
                  </div>

                  <div className="w-100 p-3">
                    <p>Requirement: <strong>{applingform.requirement}</strong></p>
                  </div>
                </div>

                <div className="d-flex flex-nowrap example-parent">
                  <div className="w-100 p-3" >
                    <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                      Shifts
                </label>
                    <MDBFormInline >
                      {shifts}
                    </MDBFormInline >
                  </div>

                  <div className="w-100 p-3">
                    <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                      Massage
        </label>
                    <input type="text" name="massage" id="defaultFormLoginPasswordEx" className="form-control" onChange={onChangeInput} />
                  </div>

                </div>
                <div className="text-center mt-4">
                  <MDBBtn color="deep-purple darken-1" type="submit" onClick={(e) => onSubmit(e)}>Submit</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
          {error && (
            <Alert variant={"danger"}>
              {error}
            </Alert>
          )}
          <br />
          <br />
          <br />
        </MDBContainer>

      </div>

    </>
  )
}

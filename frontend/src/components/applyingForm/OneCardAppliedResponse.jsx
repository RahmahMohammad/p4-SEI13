import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBBtn, MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import { Alert } from "react-bootstrap";
import axios from "axios";
import API_URL from '../../utility/apiConfig';
import sendEmail from '../../utility/sendEmail';


export default function OneCardAppliedOrganizer(props) {

    const history = useHistory();
    const { status, massage, shift, appliedOrganizer, _id } = props.response
    const [error, setError] = useState(false);//prevent page from collapse

    const onSubmitAccept = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/api/events/respons/${props.form._id}`, { status: 1, resId: _id })
            .then(data => { })
            .catch((err) => {
                setError("Somthing is wrong")
            });

        //to send email
        sendEmail(e)
    }


    return (
        <div>
            <MDBContainer>
                <br />
                <br />

                {error && (
                    <Alert variant={"danger"}>
                        {error}
                    </Alert>
                )}

                <MDBCol md='14'>
                    <MDBRow className="justify-content-center">

                    </MDBRow>
                    <br />
                    <MDBRow className="justify-content-center">
                        <MDBCard className="w-50">
                            <br />
                            <MDBCardBody>
                                {props.auth.currentUser._id === appliedOrganizer ?
                                    <>
                                        <h5>Event name: <strong> {props.form.event.name} </strong></h5>
                                        <h5>Massage: <strong> {massage} </strong></h5>
                                        <h5>Shift:<strong> {shift} </strong></h5>
                                        {status && <h5>Status:<strong> {status} </strong></h5>}
                                    </>
                                    :
                                    <>
                                        <MDBRow className="justify-content-md-center">
                                            <a href={`/AllOrganizers/${appliedOrganizer}`} className='black-text d-flex justify-content-center'>
                                                <h5>Organizer Profile</h5>
                                            </a>
                                        </MDBRow>

                                        <hr />

                                        <h5>Massage: <strong> {massage} </strong></h5>
                                        <h5>Shift:<strong> {shift} </strong></h5>
                                        {status && <h5>status:<strong> {status} </strong></h5>}

                                        <MDBRow className="justify-content-md-center">
                                            {!status == 1 && <>
                                                <MDBBtn
                                                    color="deep-purple darken-1 white-text"
                                                    onClick={e => onSubmitAccept(e)}>
                                                    Accept
                                        </MDBBtn>
                                            </>}
                                        </MDBRow>
                                    </>
                                }

                            </MDBCardBody>
                        </MDBCard>
                    </MDBRow>

                </MDBCol>
                <br />
                <br />
                <br />
            </MDBContainer>

        </div>
    )
}

import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import Axios from "axios";

import API_URL from '../../utility/apiConfig'
import { MDBCol, MDBRow } from "mdbreact";
import OneCardAppliedResponse from './OneCardAppliedResponse'


export default function AppliedOrganizers(props) {

    const [forms, setForms] = useState([])
    const [IsForms, setIsForms] = useState(false)
    const [error, setError] = useState(false);//prevent page from collapse

    // /api/user
    useEffect(() => {
        Axios.get(`${API_URL}/api/events/AppliyingForm`)
            .then(res => {
                setForms(res.data.msg)
                setIsForms(true)
            })
            .catch((err) => {
                setError("Somthing is wrong")
            });
    }, [])

    const AllForms = forms.map(form => {
        return form.responses.map(response => {
            return !response.status == 1 && <OneCardAppliedResponse response={response} auth={props.auth} isLoggedIn={props.isLoggedIn} setSelectEvent={props.setSelectEvent} form={form} />
        })
    })

    const AllAcceptedForms = forms.map(form => {
        return form.responses.map(response => {
            return response.status == 1 && <OneCardAppliedResponse response={response} auth={props.auth} isLoggedIn={props.isLoggedIn} setSelectEvent={props.setSelectEvent} form={props.form} />
        })
    })


    return (
        <div>
            <Container>

                {error && (
                    <Alert variant={"danger"}>
                        {error}
                    </Alert>
                )}

                <MDBRow className="justify-content-md-center">
                    <h1>All Applied for Events</h1>
                    <MDBCol>
                        {AllForms}
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-md-center">
                    <h1>All Accepted Events</h1>
                    <MDBCol>
                        {AllAcceptedForms}
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-md-center">
                    <h1>All Rejacted Events</h1>
                    <MDBCol>
                        {AllAcceptedForms}
                    </MDBCol>
                </MDBRow>

            </Container>
        </div>
    )
}

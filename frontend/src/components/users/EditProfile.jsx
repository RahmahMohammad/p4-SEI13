import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import API_URL from '../../utility/apiConfig'
import { Formik, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../../utility/validation'
import { Form, Button, Alert } from "react-bootstrap";

export default function EditProfile(props) {
    const history = useHistory();
    const [editUser, setEditUser] = useState(); // user info
    const { name, role, experience, events, pastEvents, appliedEvents, _id } = props.auth.currentUser;
    const [error, setError] = useState(false);//prevent page from collapse

    //to add the input inside user
    const onChangeInput = ({ target: { name, value } }) => {
        setEditUser({ ...editUser, [name]: value });
    };

    // to add the user info to database
    const onSubmit = (event) => {
        event.preventDefault();
        axios.put(`${API_URL}/api/users/editProfile/${_id}`, editUser)
            .then((res) => {
                history.push("/profile");
            })
            .catch((err) => {
                setError("Somthing is wrong")
            });

    };
    return (
        <>
            <h1>Edit Profile</h1>

            <Formik
                initialValues={{
                    name: '',
                    role: '',
                    experience: 'I do not have yet.'
                }}
                validationSchema={validationSchema}
                onSubmit={(e) => onSubmit(e)}

                render={({ errors, status, touched }) => (

                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">name</label>
                            <Field name="name" type="text" onKeyUp={onChangeInput} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <h4>Role</h4>
                            <input type="radio" id="organizers" name="role" value="organizer" onChange={onChangeInput} />
                            <label for="female">organizer</label>
                            <br />

                            <input type="radio" id="eventOwner" name="role" value="veventOwner" onChange={onChangeInput} />
                            <label for="male">eventOwner</label>
                            <br />

                            <input type="radio" id="eventOwner" name="role" value="admin" onChange={onChangeInput} />
                            <label for="male">admin</label>
                            <br />

                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">experience</label>
                            <Field name="experience" type="text" onKeyUp={onChangeInput} className={'form-control' + (errors.experience && touched.experience ? ' is-invalid' : '')} />
                            <ErrorMessage name="experience" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => onSubmit(e)}
                            >
                                Submit
                      </Button>
                        </div>
                    </Form>

                )}
            />
            {error && (
                <Alert variant={"danger"}>
                    {error}
                </Alert>
            )}
        </>
    )
}

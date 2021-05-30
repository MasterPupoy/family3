import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { DateInput } from '@opuscapita/react-dates';

export default function NewPersonForm(){
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [sex, setGender] = useState('');
    const [birthDate, setBirthdate] = useState('');
    const [job, setOccupation] = useState('');
    const [location, setAddress] = useState('');
    const [submit, setSubmit] = useState(false);

    
    const addPerson = async (e) => {
        e.preventDefault();
        setSubmit(true);

        console.log(firstname, lastname)

        await fetch(`/person/create`, {
            method : `POST`,
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                firstName : firstname.toLowerCase(),
                lastName : lastname.toLowerCase(),
                gender : sex,
                birthdate : birthDate, 
                occupation : job.toLowerCase(),
                address : location
            })
        }).then(res => res.json()).then(response =>{
                if (response){
                    window.location.reload();
                }else{
                    console.log()
                };
            });
    }
    
    return (
        <Form onSubmit={addPerson}>
            <Form.Group controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="gender">
                <Form.Label>Gender select</Form.Label>
                <Form.Control as="select" onChange={(e) => setGender(e.target.value)}>
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Birthdate</Form.Label>
                <DateInput 
                    value={birthDate}
                    dateFormat='dd/MM/yyyy'
                    disabled={false}
                    locale="en"
                />
            </Form.Group>
            <Form.Group controlId="occupation">
                <Form.Label>Occupation</Form.Label>
                <Form.Control type="text" placeholder="occupation" onChange={(e) => setOccupation(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            {(submit) ?  
                <Spinner 
                    animation='border' 
                    role='status'
                >
                    <span className='sr-only'>Loading...</span>
                </Spinner> 
                :  
                <Button 
                    type='submit' 
                    variant='primary'
                    >
                        Add Person
                </Button>
            }
           
        </Form>
    )
}
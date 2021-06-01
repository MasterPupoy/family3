import React, { useEffect, useState } from 'react';
import { Accordion, Spinner, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { capitalize } from '../helpers';

const buttonStyle = {
    margin: '10px'
}

export default function NewFamilyForm() {
    const [parent1LastName, setParent1LastName] = useState('');
    const [parent1FirstName, setParent1FirstName] = useState('')

    const [parent2LastName, setParent2LastName] = useState('');
    const [parent2FirstName, setParent2FirstName] = useState('');

    const [currentParent1, setCurrentParent1] = useState();
    const [currentParent2, setCurrentParent2] = useState();

    const [everybody, setEverybody] = useState([]);

    const [loadingFamily, setLoadingFamily] = useState(false);


    useEffect(() => {

        fetch('/person/everyone', {
            method: `GET`
        }).then(res => res.json()).then(everybody => {

            setEverybody(everybody);
        })

    }, []);

    const setParent1 = async (personFirstName, personLastName) => {

        let person1 = await fetch('/person/find', {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify({
                firstName: personFirstName.toLowerCase(),
                lastName: personLastName.toLowerCase()
            })
        }).then(res => res.json()).then(person => {
            setCurrentParent1(person);
        });

    }

    const setParent2 = async (personFirstName, personLastName) => {

        let person1 = await fetch('/person/find', {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify({
                firstName: personFirstName.toLowerCase(),
                lastName: personLastName.toLowerCase()
            })
        }).then(res => res.json()).then(person => {
            setCurrentParent2(person);
        });

    };


    const createFamily = async () => {  
        let person1 = currentParent1;
        let person2 = currentParent2

        console.log(currentParent1, currentParent2)

        let family = await fetch('/family/create-family', {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent1: {
                    id: person1[0]._id,
                    firstName : person1[0].firstname,
                    lastName : person1[0].lastname
                },
                parent2: {
                    id: person2[0]._id,
                    firstName : person2[0].firstname,
                    lastName : person2[0].lastname
                }
            })
        }).then(res => res.json()).then(family => {
            
            if(family){
                window.location.reload()
            }
        })
    }   


    return (
        <>
            <div>
                <Badge pill variant="primary">Parent</Badge> {parent1FirstName} {parent1LastName}
            </div>
            <div>
                <Badge pill variant="success">Parent</Badge> {parent2FirstName} {parent2LastName}
            </div>
            <Accordion>

                {everybody.map(person => {
                    return (
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={everybody.indexOf(person).toString()}>
                                {capitalize(person.firstname)} {capitalize(person.lastname)}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={everybody.indexOf(person).toString()}>
                                <Card.Body>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>Gender : {capitalize(person.gender)}</ListGroup.Item>
                                        <ListGroup.Item>Address : <em>{capitalize(person.address)}</em></ListGroup.Item>
                                    </ListGroup>
                                    <div>
                                        <Button
                                            style={buttonStyle}
                                            onClick={() => {
                                                setParent1FirstName(capitalize(person.firstname));
                                                setParent1LastName(capitalize(person.lastname));
                                                setParent1(person.firstname, person.lastname);
                                                }
                                            }
                                            variant='secondary'
                                        >
                                            Set as first parent
                                        </Button>
                                        <Button
                                            style={buttonStyle}
                                            onClick={() => {
                                                setParent2FirstName(capitalize(person.firstname));
                                                setParent2LastName(capitalize(person.lastname));
                                                setParent2(person.firstname, person.lastname);
                                                }
                                            }
                                            variant='info'
                                        >
                                            Set as second parent
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })
                }
            </Accordion>
            {(loadingFamily) ?
                <div>
                    <Spinner animation='border' role='status'></Spinner><span> Creating Family...</span>
                </div>
                :
                <Button style={buttonStyle} variant="danger" onClick={createFamily}> Create Family...</Button>

            }
        </>

    )
}
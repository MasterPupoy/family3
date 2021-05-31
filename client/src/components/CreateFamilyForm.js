import { every } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Accordion, Spinner, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { capitalize } from '../helpers';

const buttonStyle = {
    margin : '10px'
}

export default function NewFamilyForm(){
    const [parent1LastName, setParent1LastName] = useState('');
    const [parent1FirstName, setParent1FirstName] = useState('')

    const [parent2LastName, setParent2LastName] = useState('');
    const [parent2FirstName, setParent2FirstName] = useState('');

    const [everybody, setEverybody] = useState([]);


    useEffect(() => {

        fetch('/person/everyone', {
            method : `GET`
        }).then(res => res.json()).then(everybody => {
            
            setEverybody(everybody);
        })
        
    }, []);

    const createFamily = async (e) => {

        e.preventDefault();
        console.log(parent1FirstName.toLowerCase())

        let parent1 = await fetch('/person/find', {
            method : `POST`,
            body : JSON.stringify({
                firstName : parent1FirstName.toLowerCase(),
                lastName : parent1LastName.toLowerCase()
                })
        }).then(res => res.json()).then(person => {
            return person});
        
        let parent2 = await fetch('/person/find', {
            method : `POST`,
            body : JSON.stringify({
                firstName : parent1FirstName.toLowerCase(),
                lastName : parent1LastName.toLowerCase()
                })
        
        }).then(res => res.json()).then(person => {
            return person });


        console.log( await parent1, await parent2)
        
    }


    return(
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
                                            onClick={() => { setParent1FirstName(capitalize(person.firstname)); setParent1LastName(capitalize(person.lastname)) } } 
                                            variant='secondary'
                                            >
                                                Set as first parent 
                                        </Button>
                                        <Button 
                                            style={buttonStyle} 
                                            onClick={() => { setParent2FirstName(capitalize(person.firstname)); setParent2LastName(capitalize(person.lastname)) } } 
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
            <Button variant="danger" onClick={createFamily} > Create Family</Button>
        </>
        
    )
}
import React, { useEffect, useState } from 'react';
import { Spinner, Button, Form, Badge } from 'react-bootstrap';
import { capitalize } from '../helpers';


export default function SetChildForm() {
    const [families, setFamilies] = useState([]);
    const [everybody, setEverybody] = useState([]);
    const [addChildButton, setAddChildButton] = useState(false);

    const [parent, setParent] = useState([]);
    const [child, setChild] = useState();


    useEffect(() => {

        fetch('/family/families', {
            method: `GET`
        }).then(res => res.json()).then(families => {
            console.log(families)
            setFamilies(families);
        })

        fetch('/person/everyone', {
            method : `GET`,
        }).then(res => res.json()).then(everybody => {
            setEverybody(everybody);
        })

    }, []);

    const addChildren = async () => {

        let modifiedFamily = await fetch(`/person/${child}`, {
            method : `GET`
            }).then(res => res.json()).then(person => {

                let children = person

                return( 

                    fetch(`/family/${parent}`, {
                        method : `GET`
                    }).then(res => res.json()).then(family => { 

                        fetch('/person/setChild', {
                            method : `PUT`,
                            headers : {
                                'Content-Type' : 'application/json'
                            },
                            body : JSON.stringify({
                                parent_id : family.parent1.person_Id,
                                family_id : parent,
                                children_id : children._id,
                                firstName : children.firstname,
                                lastName : children.lastname
                            })
                        }).then((newFamily, err) => {

                            if(newFamily){
                                setAddChildButton(false)
                                window.location.reload();
                            };
                        });
                    })
                );
        });
    };
    
    return (
        <>
            <Form>
                <Form.Label>Select Family</Form.Label>
                <Form.Group>
                    <Badge pill variant="primary">Parents</Badge> 
                    <Form.Control as="select" onChange={(e) => { setParent(e.target.value); console.dir(e.target); console.log(e.target.dataset.id)}}>
                        <option>-- Select Couple --</option>
                        {families.map(couples => {
                
                           return ( 
                                        <option 
                                            value={`${couples._id}`}
                                            key={families.indexOf(couples)}
                                            >
                                                {capitalize(couples.parent1.firstname)} {capitalize(couples.parent1.lastname)} 
                                                &nbsp; and &nbsp;
                                                {capitalize(couples.parent2.firstname)} {capitalize(couples.parent2.lastname)}
                                        </option> 
                                    )
                                }
                            )
                        }               
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Badge pill variant="success">Child</Badge>
                    <Form.Control as="select" onChange={(e) => setChild(e.target.value) }>
                        <option>-- Select Child --</option>
                        {everybody.map(person => {
                            return ( 
                                            <option 
                                                value={`${person._id}`}
                                                key={`${person._id}`}
                                            >
                                                {capitalize(person.firstname)} {capitalize(person.lastname)} 
                                            </option> 
                                        )
                                    }
                                )
                        }
                    </Form.Control>
                </Form.Group>
                <Button 
                    variant="info" 
                    onClick={() => { 
                        addChildren(); 
                        setAddChildButton(true);
                    }}
                    >
                       {(addChildButton) ? <Spinner animation='border' role='status'><span className='sr-only'>Loading...</span></Spinner> : <span>Set Child</span>}
                    </Button>
            </Form>
        </>
    )
}
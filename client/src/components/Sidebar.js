import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import GlobalModal from './Modal';
import NewPersonForm from './CreateNewPersonForm';
import NewFamilyForm from './CreateFamilyForm';
import SetChildForm from './SetChildForm';

const buttonStyle = {
    margin: '10px',
    textAlign: 'center',
    display: 'block',
    width: '180px',
    padding: '10px 0px'
}

const selectionButtonStyle = {
    borderRadius: '50px',
    margin: '10px'
}

export default function Topbar(props) {
    const [personButton, setPersonButton] = useState(false);
    const [relationshipButton, setRelationshipButton] = useState(false);
    const [familyTreeButton, setFamilyTreeButton] = useState(false);

    const [createPersonButton, setCreatePersonButton] = useState(false);
    const [createFamilyButton, setCreateFamilyButton] = useState(false);
    const [childButton, setChildButton] = useState(false);

    const [section, setSection] = useState('');

    const handlePersonButton = () => {
        setPersonButton(prevState => !prevState);
        setSection(state => {
            if (state !== 'person') {
                setSection('person');
            } else {
                setSection('');
            }
        });
    };

    const handleRelationshipButton = () => {
        setRelationshipButton(prevState => !prevState);
        setSection(state => {
            if (state !== 'relationship') {
                setSection('relationship')
            } else {
                setSection('');
            }
        });
    }

    const handleFamilyButton = () => {
        setFamilyTreeButton(prevState => !prevState);
        setSection(state => {
            if (state !== 'familyTree') {
                setSection('familyTree')
            } else {
                setSection('');
            }
        });
    }

    const handleCloseCreatePersonButton = () => {
        setCreatePersonButton(prevState => !prevState);
    }

    const handleCloseCreateFamilyButton = () => {
        setCreateFamilyButton(prevState => !prevState);
    }

    const handleCloseSetChildButton = () => {
        setChildButton(prevState => !prevState);
    }

    const ButtonSelection = () => {
        if (section === 'person') {
            return (
                <div>
                    <Button
                        style={selectionButtonStyle}
                        onClick={() => setCreatePersonButton(prevState => !prevState)}
                        variant="primary">
                        Create Person
                    </Button>
                    <Button
                        style={selectionButtonStyle}
                        onClick={() => setChildButton(prevState => !prevState)}
                        variant="primary">
                        Set Children
                    </Button>
                </div>
            )
        }

        if (section === 'relationship') {
            return (
                <div>
                    <Button
                        style={selectionButtonStyle}
                        onClick={() => { setCreateFamilyButton(prevState => !prevState) }}
                        variant="secondary">
                        Create Family
                    </Button>
                    <Button
                        style={selectionButtonStyle}
                        variant="secondary"
                        disabled>
                        Add Children
                    </Button>
                </div>
            )
        }

        if (section === 'familyTree') {
            return (
                <div>
                    <Button
                        style={selectionButtonStyle}
                        variant="info">
                        Choose family
                    </Button>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    return (
        <div>
            <Button
                style={buttonStyle}
                variant="primary"
                onClick={handlePersonButton}>
                Person
            </Button>
            <Button
                style={buttonStyle}
                variant="secondary"
                onClick={handleRelationshipButton}>
                Family
            </Button>
            <Button
                style={buttonStyle}
                variant="info"
                onClick={handleFamilyButton}>
                View Family Tree
            </Button>
            <hr></hr>
            <div>
                <ButtonSelection />
            </div>
            <GlobalModal
                state={createPersonButton}
                close={handleCloseCreatePersonButton}
                title='Create New Person'
                form={<NewPersonForm />}
            />
            <GlobalModal
                state={createFamilyButton}
                close={handleCloseCreateFamilyButton}
                title='Create New Family'
                form={<NewFamilyForm />}
            />
            <GlobalModal
                state={childButton}
                close={handleCloseSetChildButton}
                title='Set Children'
                form={<SetChildForm />}
            />
        </div>
    )
}

import React from 'react';
import { Card, SimpleGrid, CardHeader, Heading, Text, CardBody, CardFooter, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import './AddedNote.css';
import Note from './Note'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'


function AddedNote({ id, text, date, deleteNote, title, editNote, modifiedDate,contains_heb }) {

    function deleteConfirmation() {
        const text = (window.confirm("Are you sure you want to delete your note?"));
        deleteNote(text, id);
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const textAlign = contains_heb(text) ? 'right' : 'left';
    const contentStyle = {
        textAlign:textAlign
    }

    return (

        <div className='addedNote' onClick={onOpen}>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent id='modalContent'>
                    <ModalCloseButton />
                    <Note className='editbleNote' validButton={false} text={text} title={title} editNote={editNote} id={id} onClose={onClose} contains_heb={contains_heb}/>
                </ModalContent>
            </Modal>
            <SimpleGrid spacing={0} templateColumns='repeat(minmax(200px, 1fr))'>
                <Card id='saved-note' w='335px'>
                    <CardHeader id='addedNoteHeading'>
                        <Heading size='md' style={contentStyle} >{title}</Heading>
                    </CardHeader>
                    <CardBody id='cardBody'>
                        <Text id='note-content' style={contentStyle}>{text}</Text>
                    </CardBody>
                    <CardFooter id='cardfooter'>
                        <div id='dates'>
                            <Text id='createdDate' fontSize='sm' pt={4}>Created: {date}</Text>
                            {modifiedDate ? <Text id='createdDate' fontSize='sm' pt={4}>Last modified: {modifiedDate}</Text> : ""}
                        </div>
                        <IconButton id='iconButton' onClick={(e) => { e.stopPropagation(); deleteConfirmation() }} icon={<DeleteIcon id='deleteIcon'/> } />
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </div>
    )
}

export default AddedNote;

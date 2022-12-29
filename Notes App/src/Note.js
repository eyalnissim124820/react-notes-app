import React, { useState } from 'react';
import './Note.css';
import { Card, Textarea, Button, Input, Divider, ButtonGroup, Flex, Stack, CardBody, CardFooter, Center } from '@chakra-ui/react'

function Note({ handleAddNote, editNote, title, text, id, onClose, contains_heb}) {
    const [addedNote, setAddedNote] = useState(text || "");
    const [addedNoteTitle, setAddedNoteTitle] = useState(title || "");
    const [validation, setValid] = useState(true);

    function handleChange(e) {
        if (e.target.id === 'titleInput') {
            setAddedNoteTitle(e.target.value);
        } else {
            setAddedNote(e.target.value);
        }
        setValid(true);
    }

    function handleClick(e) {
        if (!id) {
            if (addedNote) {
                handleAddNote(addedNote, addedNoteTitle)
                setAddedNote("")
                setAddedNoteTitle("")
            } else {
                setValid(false);
            }
        } else {
            if (text !== addedNote)
                editNote(addedNote, addedNoteTitle, id, onClose)
        }
    }

    const textAlign = contains_heb(addedNote) ? 'right' : 'left';

    const outlineColor = validation ? '' : '#ff7878fc';

    const textAreaStyle = {
        border: 'none',
        outlineColor: outlineColor,
        textAlign: textAlign
    }

    return (
        <div className='card-container'>
            <Card id='card-body' maxW='sm'>
                <CardBody id="textAndTitleBody">
                    <Input value={addedNoteTitle} id='titleInput' onChange={handleChange} placeholder='Add Title' style={contains_heb(addedNoteTitle) ? { textAlign: 'right' } : { textAlign: 'left' }} />
                    <Divider />
                    <Stack mt='2' spacing='3'>
                        <Textarea id='textarea' value={addedNote} style={textAreaStyle} onChange={handleChange} placeholder='Add Note'></Textarea>
                        <small id='noInput'>{validation ? "" : "Can not save empty note"}</small>
                    </Stack>
                </CardBody>
                <Divider id='divider' />
                <Flex id="footer">
                    <Center w='100%'>
                        <CardFooter id='noteCardfooter' onClick={handleClick}>
                            <ButtonGroup spacing='2'>
                                <Button id='addButton' variant='ghost' >{!id ? 'Add' : 'Save Changes'}</Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Center>
                </Flex>
            </Card>
        </div>
    )
}

export default Note;
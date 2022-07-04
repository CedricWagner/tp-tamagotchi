import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GameManager } from "../../utils/game-manager";

export default function NewLevelModal({onClose}) {

    const [game, setGame] = useContext(GameManager);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        onClose()
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (game.hasNewLevel) {
            handleShow()
        }
    }, [game])
  

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vous avez gagné un niveau !</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Vous êtes maintenant niveau <b>{game.globalExperience}</b> !</p>
                <p>Vous travaillez désormais pour <b>{game.currentSalary()}</b>po</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    )
}
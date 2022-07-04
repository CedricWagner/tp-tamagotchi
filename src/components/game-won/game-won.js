import { Button, Modal } from "react-bootstrap";

export default function GameWon({count}) {
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Victoire !</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Félicitations ! Vous avez gagné en <b>{count}</b> tours !</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Rejouer</Button>
                <Button variant="primary">Sauvegarder mon score</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}
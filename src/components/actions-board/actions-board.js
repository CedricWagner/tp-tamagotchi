import { useContext } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Game from "../../classes/game";
import { GameManager } from "../../utils/game-manager";
import './actions-board.css';
import { BiBaseball, BiGame, BiMoney, BiSleepy } from "react-icons/bi";

export default function ActionsBoard(props) {

    const [game, setGame] = useContext(GameManager);

    function handleNewAction(e) {
        setGame((prevState) => {
            const targetGameState = prevState.clone();
            targetGameState.currentAction = e.target.dataset.action
            return targetGameState
        });
    }

    const actions = [
        {name: 'Manger', code: Game.actions.eat, icon: <BiGame />},
        {name: 'Dormir', code: Game.actions.sleep, icon: <BiSleepy />},
        {name: 'Travailler', code: Game.actions.work, icon: <BiMoney />},
        {name: 'Jouer', code: Game.actions.play, icon: <BiBaseball />},
    ]

    return (
        <div className="actions-board">
            <ButtonGroup className="mb-2">
            {actions.map((action, index) => (
                <Button 
                    size="lg" 
                    key={index} 
                    variant={action.code === game.currentAction ? 'success' : 'primary' } 
                    data-action={action.code} 
                    onClick={handleNewAction}>
                    {action.icon} &nbsp;
                    {action.name}
                </Button>
            ))}
            </ButtonGroup>
        </div>
    )
}
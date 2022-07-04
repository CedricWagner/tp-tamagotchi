import { useContext } from "react";
import { Badge } from "react-bootstrap";
import { GameManager } from "../../utils/game-manager";
import Statistic from "../statistic/statistic";
import './statistics-board.css';

export default function StatisticsBoard(props) {

    const [game] = useContext(GameManager);
    const currentSalary = game.currentSalary();

    return (
        <div className="statistics-board">
            <div className="row">
                <div className="col-sm-4">
                    <Statistic name="Satiété" amount={game.satiety} />
                </div>
                <div className="col-sm-4">
                    <Statistic name="Energie" amount={game.energy} />
                </div>
                <div className="col-sm-4">
                    <Statistic name="Distraction" amount={game.entertainment} />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <span>Argent</span> <Badge bg="secondary">{game.money}</Badge> <small>+ {currentSalary}</small> 
                </div>
                <div className="col">
                    <span>XP</span> <Badge bg="info">{game.workExperience}</Badge>
                </div>
                <div className="col">
                    <span>Niveau</span> <Badge bg="success">{game.globalExperience}</Badge>
                </div>
            </div>
        </div>
    )
}
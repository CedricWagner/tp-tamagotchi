import logo from './logo.svg';
import './App.css';
import Statistic from './components/statistic/statistic';
import { GameManager } from './utils/game-manager';
import React, { useEffect, useState } from 'react';
import Game from './classes/game';
import { baseStatistics } from './utils/contants';
import StatisticsBoard from './components/statistics-board/statistics-board';
import ActionsBoard from './components/actions-board/actions-board';
import GameOver from './components/game-over/game-over';
import NewLevelModal from './components/new-level-modal/new-level-modal';
import GameWon from './components/game-won/game-won';

function App() {

    const gameState = useState(new Game(
        baseStatistics.satiety, 
        baseStatistics.energy, 
        baseStatistics.entertainment,
        baseStatistics.money,
        baseStatistics.globalExperience,
        baseStatistics.workExperience,
        Game.actions.sleep
    ))

    const [idInterval, setIdInterval] = useState();

    function newCycle() {
        gameState[1]((prevState) => {
            let targetGameState = prevState.clone();

            if (!targetGameState.isGameOver) {
                targetGameState.applyCurrentAction() 
                targetGameState.currentCycle++

                // check if new level
                if (targetGameState.hasNewLevel) {
                    setIdInterval((prevIntervalState) => {
                        clearInterval(prevIntervalState)
                    })
                }                
            } else {
                setIdInterval((prevIntervalState) => {
                    clearInterval(prevIntervalState)
                })
            }

            return targetGameState
        });
    }

    function onNewLevelModalClose() {
        gameState[1]((prevState) => {
            let targetGameState = prevState.clone();
            targetGameState.isPaused = false
            targetGameState.hasNewLevel = false
            return targetGameState
        });

    }

    useEffect(() => {
        if (gameState[0].isPaused === false) {
            const id = setInterval(() => {
                newCycle()
            }, 2000);

            setIdInterval(id)
        }

        
        return () => {
            clearInterval(idInterval)
        };

    }, [gameState[0].isPaused]);



    return (
        <div className="app">
            <GameManager.Provider value={gameState}>
                <div className="container">
                    <div className="app__container">
                        { !gameState[0].isGameOver && !gameState[0].isWon && (
                            <React.Fragment>
                                <div className="app__head">
                                    <p className="cycle-counter"><span className="cycle-counter__label">Cycle :</span> <span className="cycle-counter__value">{gameState[0].currentCycle}</span></p>
                                    <StatisticsBoard />
                                </div>
                                <div className="app__actions">
                                    <ActionsBoard />
                                </div>
                                <NewLevelModal onClose={onNewLevelModalClose}/>
                            </React.Fragment>
                        )}
                        { gameState[0].isGameOver && (
                            <GameOver count={gameState[0].currentCycle}/>
                        )}
                        { gameState[0].isWon && (
                            <GameWon count={gameState[0].currentCycle}/>
                        )}
                    </div>
                </div>
            </GameManager.Provider>
        </div>
    );
}

export default App;

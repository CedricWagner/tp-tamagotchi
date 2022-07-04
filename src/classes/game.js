export default class Game {
    static actions = {
        sleep: "SLEEP",
        eat: "EAT",
        work: "WORK",
        play: "PLAY",
    };
    
    constructor (satiety=0, energy=0, entertainment=0, money=0, globalExperience=0, workExperience=0, currentAction=Game.actions.sleep, currentCycle = 0) {
        this.satiety = satiety
        this.energy = energy
        this.entertainment = entertainment
        this.money = money
        this.globalExperience = globalExperience
        this.workExperience = workExperience
        this.currentAction = currentAction;
        this.currentCycle = currentCycle;
        this.isGameOver = false;
        this.hasNewLevel = false;
        this.isPaused = false;
        this.isWon = false;
    }

    applyCurrentAction() {
        // force sleep if money = 0
        if (this.money <= 0 && (this.currentAction === Game.actions.eat || this.currentAction === Game.actions.play)) {
            this.currentAction = Game.actions.sleep
        }

        this._checkVictoryConditions();
        this._checkDefeatConditions();
        let hasNewLevel = this._checkLevelUp();
        if (hasNewLevel) {
            return;
        }

        switch (this.currentAction) {
            case Game.actions.sleep:
                this.sleep()
                break;
            case Game.actions.eat:
                this.eat()
                break;
            case Game.actions.work:
                this.work()
                break;
            case Game.actions.play:
                this.play()
                break;
            default:
                break;
        }
    }

    sleep() {
        this._incrementStat('energy', 15)

        this._decrementStat('satiety', 5)
        this._decrementStat('entertainment', 5)
    }

    eat() {
        this._incrementStat('satiety', 15)
        
        this._decrementStat('energy', 5)
        this._decrementStat('money', 10)
        this._decrementStat('entertainment', 5)
    }

    work() {
        this.money += this.currentSalary()
        this.workExperience += 5
        
        this._decrementStat('energy', 5)
        this._decrementStat('satiety', 5)
        this._decrementStat('entertainment', 10)
    }

    play() {
        this._incrementStat('entertainment', 15)
        
        this._decrementStat('energy', 5)
        this._decrementStat('satiety', 5)
        this._decrementStat('money', 10)
    }

    currentSalary() {
        return 15 * (1 + ((this.globalExperience) / 10))
    }

    _incrementStat(key, amount) {
        this[key] += amount;
        if (this[key] > 100) {
            this[key] = 100
        }
    }

    _decrementStat(key, amount) {
        this[key] -= amount;
        if (this[key] < 0) {
            this[key] = 0
        }
    }

    _checkDefeatConditions () {
        if (this.satiety <= 0 || this.energy <= 0) {
            this.isGameOver = true
            return true;
        }

        return false;
    }

    _checkVictoryConditions () {
        if (this.globalExperience >= 10) {
            this.isWon = true
            return true;
        }

        return false;
    }

    _checkLevelUp () {
        if (this.workExperience >= 10) {
            this.globalExperience++ 
            this.workExperience = 0
            this.isPaused = true
            this.hasNewLevel = true

            return true;
        }

        return false;
    }

    clone() {
        let clone = new Game();
        Object.keys(this).map((key) => {
            clone[key] = this[key];
        });
        return clone;
    }

}
import { ProgressBar } from "react-bootstrap";

export default function Statistic(props) {

    let variant = 'primary';
    
    if (props.amount >= 75) {
        variant = 'success'
    } else if (props.amount < 25) {
        variant = 'danger'
    }

    return (
        <div className="statistic">
            <div className="statistic__name">
                { props.name }
            </div>
            <ProgressBar animated now={props.amount} variant={variant} />
        </div>
    )
}
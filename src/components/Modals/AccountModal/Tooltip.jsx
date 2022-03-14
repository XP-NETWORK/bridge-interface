
import msgCloud from "../../../assets/img/icons/msg-cloud.svg"


export default function Tooltip() {
    return (
        <div className="tooltip__wrapper">
            <div className="tooltip__container">
                <img src={msgCloud} alt="" />
                <div className="tooltip__txt">Copied to clipboard</div>
            </div>
        </div>
    )
}

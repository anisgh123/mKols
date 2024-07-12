import checked from "../../Assets/Images/Icons/checked.png"
import "./index.css"
type Props = {
    title : string,
    string1: string,
    string2: string,
    string3: string,
}

export default function CardInfos({title , string1,string2,string3}: Props) {
  return (
    <div className="card-info">
        <h3>{title}</h3>
        <div className="infos">
            <span>
                <img src={checked} alt="checked"/><p>{string1}</p>
            </span>
            <span>
                <img src={checked} alt="checked"/><p>{string2}</p>
            </span>
            <span>
                <img src={checked} alt="checked"/><p>{string3}</p>
            </span>
        </div>
    </div>
  )
}
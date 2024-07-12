import './index.css'

type Props = {
    value: string,
    color:string,
    bgcolor:string
}

export default function CardButton({value , color,bgcolor}: Props) {
  return (
        <button  id='card-button' style={{color : color , backgroundColor : bgcolor}}>
            {value}
        </button>  
    )
}
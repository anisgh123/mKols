import "./index.css"

type Props = {
  logo:string,
  title : string,
  subtitle : string,
}

export default function CardTitle({logo,title,subtitle}: Props) {
  return (
    <div className="card-title">
      <img src={logo} alt="logo" />
      <div className="texts">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}
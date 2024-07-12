import "./index.css"
type Props = {
  title: string;
  subtitle : string;
}

export default function Title({title , subtitle}: Props) {
  return (
    <div className='title-container'>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
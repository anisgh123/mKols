
import "./index.css"
import { ReactNode } from "react"
type Props = {
    children : ReactNode
}

export default function Card({children}: Props) {
  return (
    <div className="card-container">
        {children}
    </div>
  )
}
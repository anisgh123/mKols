import "./index.css"
import logo from "../../Assets/Images/Icons/Vector.png"

export default function Logo() {
  return (
    <div className="logo">
        <img src={logo} alt="logo-img" />
        <h2 className="logo-title">mKOLs</h2>
    </div>
  )
}
import logo from "../assets/logo.png"
import "../styles/watermark.css"

function Watermark(){
    return(
        <div className="watermark-container">
            <img src={logo} alt="Logo TKITI" width={20}/>
            <p>Tata Kelola & Infrastruktur TI</p>
        </div>
    )
}

export default Watermark
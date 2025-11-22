import logo from "../assets/logo.png"
import "../styles/watermark.css"

function Watermark(){
    return(
        <div className="watermark-container">
            <img src={logo} alt="Logo TKITI" width={20}/>
            <p>TIKITIKI Admin Panel</p>
        </div>
    )
}

export default Watermark
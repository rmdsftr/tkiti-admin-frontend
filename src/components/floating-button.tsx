import { FaPenFancy } from "react-icons/fa"
import "../styles/floating-button.css"

function FloatingButton(){
    return(
        <div className="floating-button">
            <FaPenFancy/>
            <p>Buat Artikel</p>
        </div>
    )
}

export default FloatingButton
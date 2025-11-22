import { FaPenFancy } from "react-icons/fa"
import "../styles/floating-button.css"
import { useNavigate } from "react-router-dom";

function FloatingButton(){
    const navigate = useNavigate();

    return(
        <div className="floating-button" onClick={() => navigate("/write")}>
            <FaPenFancy/>
            <p>Buat Artikel</p>
        </div>
    )
}

export default FloatingButton
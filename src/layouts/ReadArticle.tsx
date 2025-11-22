import { FaCalendar, FaEye, FaPenAlt} from "react-icons/fa";
import "../styles/read-article.css";
import Button from "../components/button";

export default function ReadArticleLayout() {
  return (
    <div className="read-overlay">
      <div className="read-container">
        {/* Header */}
        <div className="read-header">
          <button className="close-button">
            x
          </button>
        </div>

        {/* Content */}
        <div className="read-content">
          {/* Left Section */}
          <div className="read-left">
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop" alt="Article" />
            <h2>API Security: Protect Your Backend dari Common Vulnerabilities</h2>
            <div className="identity">
              <div className="detail">
                <FaCalendar />
                <p>12 Oktober 2025</p>
              </div>
              <div className="detail">
                <FaEye />
                <p>125 views</p>
              </div>
              <div className="detail">
                <FaPenAlt />
                <p>Ramadhani Safitri</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="read-right">
            <div className="article-text">
              <p className="paragraf">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
                \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div className="tags">
              <p>Machine learning</p>
              <p>Cybersecurity</p>
              <p>IoT</p>
              <p>Blockchain</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="read-footer">
          <Button text="Hapus Artikel" variant="outline" size="large" />
          <Button text="Lanjutkan Menulis" variant="solid" size="large" />
        </div>
      </div>
    </div>
  );
}
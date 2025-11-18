import "../styles/photo-round.css";

interface Props {
  gambar: string;
  height: number;
  width: number;
}

function PhotoRound({ gambar, height, width }: Props) {
  return (
    <div className="photo-round-container">
      <img 
        src={gambar} 
        alt="Profile" 
        height={height} 
        width={width} 
        className="gambar"
      />
    </div>
  );
}

export default PhotoRound;
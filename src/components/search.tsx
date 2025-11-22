import { FaSearch } from "react-icons/fa";
import "../styles/searchbar.css";

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export default function SearchBar({
    placeholder = "Cari...",
    value,
    onChange,
    className = ""
}: SearchBarProps) {
    return (
        <div className={`searchbar-container ${className}`}>
            <FaSearch className="searchbar-icon" />

            <input
                type="text"
                className="searchbar-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
        </div>
    );
}

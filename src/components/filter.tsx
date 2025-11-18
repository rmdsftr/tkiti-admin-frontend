import { useState, useRef, useEffect } from "react";
import "../styles/filter.css"

interface Props {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    options: { label: string; value: string }[];
    placeholder?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

function Filter({
    iconLeft,
    iconRight,
    options,
    placeholder = "Pilih opsi...",
    defaultValue,
    onChange,
    disabled = false,
    className = ""
}: Props) {
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    
    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || placeholder;

    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
        if (onChange) {
            onChange(value);
        }
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div 
            className={`filter-container ${disabled ? 'disabled' : ''} ${className}`}
            ref={dropdownRef}
        >
            <div 
                className="filter-trigger"
                onClick={toggleDropdown}
            >
                {iconLeft && <span className="filter-icon-left">{iconLeft}</span>}
                
                <span className={`filter-label ${!selectedValue ? 'placeholder' : ''}`}>
                    {selectedLabel}
                </span>

                {iconRight ? (
                    <span className={`filter-icon-right ${isOpen ? 'rotate' : ''}`}>
                        {iconRight}
                    </span>
                ) : (
                    <span className={`filter-arrow ${isOpen ? 'rotate' : ''}`}>▼</span>
                )}
            </div>

            {isOpen && (
                <div className="filter-dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`filter-option ${selectedValue === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            <span>{option.label}</span>
                            {selectedValue === option.value && (
                                <span className="check-icon">✓</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Filter;
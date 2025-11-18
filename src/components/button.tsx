import "../styles/button.css"

interface Props {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    text: string;
    variant?: 'solid' | 'outline';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

function Button({
    iconLeft,
    iconRight,
    text,
    variant = 'solid',
    size = 'medium',
    onClick,
    disabled = false,
    fullWidth = false,
    type = 'button',
    className = ''
}: Props) {
    const buttonClasses = [
        'button-container',
        variant,
        size,
        fullWidth ? 'full-width' : '',
        disabled ? 'disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {iconLeft && <span className="icon-left">{iconLeft}</span>}
            <span className="button-text">{text}</span>
            {iconRight && <span className="icon-right">{iconRight}</span>}
        </button>
    )
}

export default Button
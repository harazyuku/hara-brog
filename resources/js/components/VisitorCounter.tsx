interface VisitorCounterProps {
    value: string;
}

export default function VisitorCounter({ value }: VisitorCounterProps) {
    return (
        <span
            className="visitor-counter"
            aria-label={value}
            title={`${value}人目`}
        >
            {Array.from(value).map((digit, index) => (
                <span
                    className="visitor-counter__digit"
                    aria-hidden="true"
                    key={`${index}-${digit}`}
                >
                    {digit}
                </span>
            ))}
        </span>
    );
}

import { Star } from 'lucide-react';

interface RatingProps {
    value: number;
    max?: number;
    showCount?: boolean;
    count?: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Rating: React.FC<RatingProps> = ({
    value,
    max = 5,
    showCount = false,
    count,
    size = 'md',
    className = ''
}) => {
    const roundedValue = Math.round(value * 2) / 2;

    const sizeStyles = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    const textSizeStyles = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    return (
        <div className={`flex items-center ${className}`}>
            <div className="flex">
                {[...Array(max)].map((_, i) => {
                    // Full star
                    if (i < Math.floor(roundedValue)) {
                        return (
                            <Star key={i} className={`${sizeStyles[size]} fill-yellow-400 text-yellow-400`} />
                        );
                    }
                    // Half star
                    else if (i < roundedValue) {
                        return (
                            <div key={i} className="relative">
                                <Star className={`${sizeStyles[size]} text-gray-300`} />
                                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                                    <Star className={`${sizeStyles[size]} fill-yellow-400 text-yellow-400`} />
                                </div>
                            </div>
                        );
                    }
                    // Empty star
                    return <Star key={i} className={`${sizeStyles[size]} text-gray-300`} />;
                })}
            </div>

            {showCount && count !== undefined && (
                <span className={`ml-1 text-gray-600 ${textSizeStyles[size]}`}>
                    ({count})
                </span>
            )}
        </div>
    );
};

export default Rating;
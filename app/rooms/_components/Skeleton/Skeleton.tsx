export default function Skeleton({
    className = '',
    isAbsolute = false
}: {
    className?: string;
    isAbsolute?: boolean;
}) {


    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${isAbsolute ? 'absolute top-0 left-0 z-10' : ''} ${className}`}
        />
    );
}
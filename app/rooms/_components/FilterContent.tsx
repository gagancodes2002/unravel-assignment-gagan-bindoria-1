import { useCallback } from "react";

const filterOptions = [
    'Breakfast Included',
    'Free Cancellation',
    'Hotel',
    'Reserve now, Pay later',
    'Pool',
    'Gym',
    'Free WiFi',
    'Pet Friendly'
];

export default function FilterContent({
    selectedFilters,
    onFilterChange
}: {
    selectedFilters: string[];
    onFilterChange: (filters: string[]) => void;
}) {
    const handleFilterToggle = useCallback((filter: string) => {
        const newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];
        onFilterChange(newFilters);
    }, [selectedFilters, onFilterChange]);

    return (
        <div className="px-2">
            <div className="space-y-3">
                {filterOptions.map((filter) => (
                    <label key={filter} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedFilters.includes(filter)}
                            onChange={() => handleFilterToggle(filter)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{filter}</span>
                    </label>
                ))}
            </div>

            {selectedFilters.length > 0 && (
                <>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="flex flex-wrap gap-2">
                        {selectedFilters.map((filter) => (
                            <span
                                key={filter}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                            >
                                {filter}
                                <button
                                    onClick={() => handleFilterToggle(filter)}
                                    className="ml-2 w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
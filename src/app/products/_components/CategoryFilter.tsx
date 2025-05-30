'use client';

interface Props {
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];

const CategoryFilter: React.FC<Props> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div>
            <h2 className="font-bold mb-2">Categories</h2>
            <ul className="space-y-2">
                {/* All option */}
                <li className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="all"
                        checked={selectedCategory === null}
                        onChange={() => onCategoryChange(null)}
                    />
                    <label htmlFor="all" className="cursor-pointer">All</label>
                </li>

                {/* Category checkboxes */}
                {categories.map((category) => (
                    <li key={category} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id={category}
                            checked={selectedCategory === category}
                            onChange={() => {
                                // Toggle off if same category is clicked
                                onCategoryChange(selectedCategory === category ? null : category);
                            }}
                        />
                        <label htmlFor={category} className="cursor-pointer">{category}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;

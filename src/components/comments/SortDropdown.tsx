import type { SortType } from '../../types';
import { SORT_TYPES } from '../../utils/constants';

interface SortDropdownProps {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
}

const SortDropdown = ({ currentSort, onSortChange }: SortDropdownProps) => {
  const sortOptions = [
    { value: SORT_TYPES.NEWEST, label: 'Newest First' },
    { value: SORT_TYPES.MOST_LIKED, label: 'Most Liked' },
    { value: SORT_TYPES.MOST_DISLIKED, label: 'Most Disliked' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortType)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

interface TableHeadingProps {
    name: string;
    sortable?: boolean;
    sort_field?: string;
    sort_direction?: string;
    sortChanged?: (name: string) => void;
    children?: React.ReactNode;
}

export default function TableHeading({
    name,
    sortable = true,
    sort_field = '',
    sort_direction = '',
    sortChanged = () => {},
    children,
}: TableHeadingProps) {
    return (
        <th onClick={(e) => sortChanged(name)} className="px-3 py-3">
            <div className="flex cursor-pointer items-center justify-between gap-1">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                'w-4 ' +
                                (sort_field === name && sort_direction === 'asc'
                                    ? 'text-white'
                                    : '')
                            }
                        />
                        <ChevronDownIcon
                            className={
                                '-mt-2 w-4 ' +
                                (sort_field === name &&
                                sort_direction === 'desc'
                                    ? 'text-white'
                                    : '')
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}

import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import { BLOCK_STATUS_CLASS_MAP, BLOCK_STATUS_TEXT_MAP } from '@/constants';
import { Link, router } from '@inertiajs/react';

interface Winery {
    id: number;
    name: string;
    city: string;
    province: string;
    block: boolean;
    created_at: string;
}

interface Wine {
    id: number;
    name: string;
    image: string;
    city: string;
    province: string;
    block: boolean;
    created_at: string;
    winery: Winery;
}

// Define WinesTableProps to satisfy Record<string, unknown>
interface WinesTableProps extends Record<string, unknown> {
    wines: {
        data: Wine[];
        meta: PaginationMeta;
    };
    queryParams?: Record<string, string>; // Optional queryParams with default as an empty object
}

interface Links {
    url: string;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Links[];
}

export default function WinesTable({
    wines,
    queryParams = {},
}: WinesTableProps) {
    queryParams = queryParams || {};

    // Filtrar queryParams para eliminar la clave "page"
    const filteredQueryParams = Object.fromEntries(
        Object.entries(queryParams).filter(([key]) => key !== 'page'),
    );

    const getStatusClass = (isBlocked: boolean) => {
        return isBlocked
            ? BLOCK_STATUS_CLASS_MAP[1]
            : BLOCK_STATUS_CLASS_MAP[0];
    };

    const getStatusText = (isBlocked: boolean) => {
        return isBlocked ? BLOCK_STATUS_TEXT_MAP[1] : BLOCK_STATUS_TEXT_MAP[0];
    };

    const searchFieldChange = (name: string, value: string) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('wine.index'), queryParams);
    };

    const handleKeyDown = (
        name: string,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key !== 'Enter') return;

        const target = e.currentTarget;
        searchFieldChange(name, target.value);
    };

    const sortChanged = (name: string) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction =
                queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('wine.index'), queryParams);
    };

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                id
                            </TableHeading>
                            <TableHeading name="image" sortable={false}>
                                image
                            </TableHeading>
                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                name
                            </TableHeading>
                            <TableHeading
                                name="winery_id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                winery
                            </TableHeading>
                            <TableHeading
                                name="block"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                province
                            </TableHeading>

                            <th className="px-3 py-3 text-right">actions</th>
                        </tr>
                    </thead>
                    <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    placeholder="Wine name"
                                    defaultValue={queryParams.name}
                                    onBlur={(e) =>
                                        searchFieldChange(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    onKeyDown={(e) => handleKeyDown('name', e)}
                                />
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.block}
                                    onChange={(e) =>
                                        searchFieldChange(
                                            'block',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select a status</option>
                                    <option value="0">Active</option>
                                    <option value="1">Blocked</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wines.data.map((wine) => (
                            <tr
                                key={wine.id}
                                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <th className="px-3 py-2">{wine.id}</th>
                                <td className="px-3 py-2">
                                    <picture>
                                        <source
                                            src={wine.image}
                                            type="image/png"
                                        />
                                        <img
                                            src={wine.image}
                                            alt={wine.name}
                                            width="100"
                                            loading="lazy"
                                            className="aspect-video w-28"
                                        />
                                    </picture>
                                </td>
                                <td className="px-3 py-2">{wine.name}</td>
                                <td className="px-3 py-2">
                                    {wine.winery.name}
                                </td>
                                <td className="px-3 py-2">
                                    <span
                                        className={`rounded px-2 py-1 text-white ${getStatusClass(wine.block)}`}
                                    >
                                        {getStatusText(wine.block)}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-right">
                                    <Link
                                        href={route('wine.edit', wine.id)}
                                        className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('wine.destroy', wine.id)}
                                        className="mx-1 font-medium text-red-600 hover:underline dark:text-red-500"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                links={wines.meta.links}
                queryParams={filteredQueryParams}
            />
            {/* <pre>{JSON.stringify(wines, undefined, 2)}</pre> */}
        </>
    );
}

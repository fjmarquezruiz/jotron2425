import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import {
    ANDALUSIA_PROVINCES,
    BLOCK_STATUS_CLASS_MAP,
    BLOCK_STATUS_TEXT_MAP,
} from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Winery {
    id: number;
    name: string;
    city: string;
    province: string;
    block: boolean;
    created_at: string;
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

// Define IndexProps to satisfy Record<string, unknown>
interface IndexProps extends Record<string, unknown> {
    wineries: {
        data: Winery[];
        meta: PaginationMeta;
    };
    queryParams?: Record<string, string>; // Optional queryParams with default as an empty object
    success?: string;
}

export default function Index({
    wineries,
    queryParams = {},
    success,
}: PageProps<IndexProps>) {
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

        router.get(route('winery.index'), queryParams);
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

        router.get(route('winery.index'), queryParams);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Winery
                    </h2>
                    <Link
                        className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600"
                        href={route('winery.create')}
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="winery" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-4 rounded bg-emerald-500 px-4 py-2 text-white">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're in winery
                            <div className="overflow-auto">
                                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                                    <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                id
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                name
                                            </TableHeading>
                                            <TableHeading
                                                name="city"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                city
                                            </TableHeading>
                                            <TableHeading
                                                name="province"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                province
                                            </TableHeading>
                                            <TableHeading
                                                name="block"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                province
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                created at
                                            </TableHeading>

                                            <th className="px-3 py-3 text-right">
                                                actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Winery name"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChange(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleKeyDown('name', e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.province
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChange(
                                                            'province',
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select a province
                                                    </option>
                                                    {ANDALUSIA_PROVINCES.map(
                                                        (province) => (
                                                            <option
                                                                key={
                                                                    province.value
                                                                }
                                                                value={
                                                                    province.value
                                                                }
                                                            >
                                                                {province.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.block
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChange(
                                                            'block',
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select a status
                                                    </option>
                                                    <option value="0">
                                                        Active
                                                    </option>
                                                    <option value="1">
                                                        Blocked
                                                    </option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wineries.data.map((winery) => (
                                            <tr
                                                key={winery.id}
                                                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <th className="px-3 py-2">
                                                    {winery.id}
                                                </th>
                                                <td className="cursor-pointer px-3 py-2 text-gray-100 hover:underline">
                                                    <Link
                                                        href={route(
                                                            'winery.show',
                                                            winery.id,
                                                        )}
                                                    >
                                                        {winery.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {winery.city}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {winery.province}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={`rounded px-2 py-1 text-white ${getStatusClass(winery.block)}`}
                                                    >
                                                        {getStatusText(
                                                            winery.block,
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="text-nowrap px-3 py-2">
                                                    {winery.created_at}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <Link
                                                        href={route(
                                                            'winery.edit',
                                                            winery.id,
                                                        )}
                                                        className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            'winery.destroy',
                                                            winery.id,
                                                        )}
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
                                links={wineries.meta.links}
                                queryParams={filteredQueryParams}
                            />
                            <pre>{JSON.stringify(wineries, undefined, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

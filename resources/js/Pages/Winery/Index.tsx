import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { BLOCK_STATUS_CLASS_MAP, BLOCK_STATUS_TEXT_MAP } from '@/constants';
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

// Define IndexProps to satisfy Record<string, unknown>
interface IndexProps extends Record<string, unknown> {
    wineries: {
        data: Winery[];
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

export default function Index({
    wineries,
    queryParams = {},
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Winery
                </h2>
            }
        >
            <Head title="winery" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're in winery
                            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                                <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">id</th>
                                        <th className="px-3 py-3">name</th>
                                        <th className="px-3 py-3">city</th>
                                        <th className="px-3 py-3">province</th>
                                        <th className="px-3 py-3">block</th>
                                        <th className="px-3 py-3">
                                            created at
                                        </th>
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
                                                defaultValue={queryParams.name}
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
                                                <option value="Almeria">
                                                    Almeria
                                                </option>
                                                <option value="Cádiz">
                                                    Cádiz
                                                </option>
                                                <option value="Córdoba">
                                                    Córdoba
                                                </option>
                                                <option value="Granada">
                                                    Granada
                                                </option>
                                                <option value="Huelva">
                                                    Huelva
                                                </option>
                                                <option value="Jaén">
                                                    Jaén
                                                </option>
                                                <option value="Málaga">
                                                    Málaga
                                                </option>
                                                <option value="Sevilla">
                                                    Sevilla
                                                </option>
                                            </SelectInput>
                                        </th>
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
                                            <td className="px-3 py-2">
                                                {winery.name}
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
                            {/* {console.log('aki', queryParams)} */}
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

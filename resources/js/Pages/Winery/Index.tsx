import Pagination from '@/Components/Pagination';
import { BLOCK_STATUS_CLASS_MAP, BLOCK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

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

export default function Index({
    wineries,
}: PageProps<{ wineries: { data: Winery[]; meta: PaginationMeta } }>) {
    const getStatusClass = (isBlocked: boolean) => {
        return isBlocked
            ? BLOCK_STATUS_CLASS_MAP[1]
            : BLOCK_STATUS_CLASS_MAP[0];
    };

    const getStatusText = (isBlocked: boolean) => {
        return isBlocked ? BLOCK_STATUS_TEXT_MAP[1] : BLOCK_STATUS_TEXT_MAP[0];
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
                                                    className={`rounded px-1 px-2 text-white ${getStatusClass(winery.block)}`}
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
                            <Pagination links={wineries.meta.links} />
                            <pre>{JSON.stringify(wineries, undefined, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

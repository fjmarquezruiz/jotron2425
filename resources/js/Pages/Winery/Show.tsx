import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import WinesTable from '../Wine/WinesTable';

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

interface ShowProps extends Record<string, unknown> {
    winery: Winery;
    wines: {
        data: Wine[];
        meta: PaginationMeta;
    };
    queryParams?: Record<string, string>; // Optional queryParams with default as an empty object
}

export default function Show({
    winery,
    wines,
    queryParams = {},
}: PageProps<ShowProps>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Winery "${winery.name}"`}
                </h2>
            }
        >
            <Head title={`Winery "${winery.name}"`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mt-2 grid grid-cols-2 gap-1">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Winery ID
                                        </label>
                                        <p className="mt-1">{winery.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Winery Name
                                        </label>
                                        <p className="mt-1">{winery.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            City
                                        </label>
                                        <p className="mt-1">{winery.city}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Province
                                        </label>
                                        <p className="mt-1">
                                            {winery.province}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {wines.data.length ? (
                                <WinesTable
                                    wines={wines}
                                    queryParams={queryParams}
                                />
                            ) : (
                                'No data available'
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

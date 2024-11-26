import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import WinesTable from './WinesTable';

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

// Define IndexProps to satisfy Record<string, unknown>
interface IndexProps extends Record<string, unknown> {
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

export default function Index({
    wines,
    queryParams = {},
}: PageProps<IndexProps>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Wine
                </h2>
            }
        >
            <Head title="wine" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <WinesTable
                                wines={wines}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

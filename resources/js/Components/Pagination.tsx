import { Link } from '@inertiajs/react';

// Define la interfaz para un enlace de paginación
interface LinkItem {
    url: string; // La URL del enlace
    label: string; // El texto que se mostrará en el enlace
    active: boolean; // Indica si el enlace es la página activa
}

// Define la interfaz para las propiedades del componente Pagination
interface PaginationProps {
    links: LinkItem[]; // Un array de objetos LinkItem que representan los enlaces de paginación
    queryParams?: Record<string, string>; // Aceptar queryParams como prop opcional
}

export default function Pagination({
    links,
    queryParams = {},
}: PaginationProps) {
    // console.log(links.length);
    return (
        // Check if more than 1 page, only if more than 1 page display pagination
        links.length > 3 && (
            <nav className="mt-4 text-center">
                {/* Itera sobre cada enlace en el array links */}
                {links.map((link) => {
                    // Construir la URL con los parámetros de consulta
                    const urlWithParams = new URL(
                        link.url,
                        window.location.origin,
                    );
                    Object.keys(queryParams).forEach((key) => {
                        urlWithParams.searchParams.append(
                            key,
                            queryParams[key],
                        );
                    });

                    // console.log(urlWithParams.toString());
                    return (
                        <Link
                            key={link.label}
                            preserveScroll
                            href={urlWithParams.toString()} // Usar la URL construida
                            className={
                                'inline-block rounded-lg px-3 py-2 text-xs ' +
                                (link.active ? 'active bg-gray-950' : '') +
                                ' ' +
                                (!link.url
                                    ? 'cursor-not-allowed text-gray-500'
                                    : 'text-gray-200 hover:bg-gray-950')
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    );
                })}
            </nav>
        )
    );
}

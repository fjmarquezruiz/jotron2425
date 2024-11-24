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
}

export default function Pagination({ links }: PaginationProps) {
    return (
        <nav className="mt-4 text-center">
            {/* Itera sobre cada enlace en el array links */}
            {links.map((link) => (
                <Link
                    key={link.label}
                    preserveScroll
                    href={link.url}
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
            ))}
        </nav>
    );
}

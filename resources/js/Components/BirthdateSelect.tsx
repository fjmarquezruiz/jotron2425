import {
    forwardRef,
    SelectHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

export default forwardRef(function BirthdateSelect(
    {
        className = '',
        isFocused = false,
        onChange,
        ...props
    }: SelectHTMLAttributes<HTMLSelectElement> & {
        isFocused?: boolean;
        onChange?: (date: { day: number; month: number; year: number }) => void;
    },
    ref,
) {
    const dayRef = useRef<HTMLSelectElement>(null);
    const monthRef = useRef<HTMLSelectElement>(null);
    const yearRef = useRef<HTMLSelectElement>(null);

    const [days, setDays] = useState<number[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    useImperativeHandle(ref, () => ({
        focus: () => dayRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            dayRef.current?.focus();
        }
    }, [isFocused]);

    useEffect(() => {
        if (selectedMonth !== null && selectedYear !== null) {
            const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
            setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
            if (dayRef.current) {
                dayRef.current.value = '';
            }
        }
    }, [selectedMonth, selectedYear]);

    const handleChange = () => {
        const day = parseInt(dayRef.current?.value || '0', 10);
        const month = parseInt(monthRef.current?.value || '0', 10);
        const year = parseInt(yearRef.current?.value || '0', 10);
        onChange?.({ day, month, year });
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = parseInt(event.target.value, 10);
        setSelectedMonth(month);
        handleChange();
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(event.target.value, 10);
        setSelectedYear(year);
        handleChange();
    };

    const renderDays = () => {
        return days.map((day) => (
            <option key={day} value={day}>
                {day}
            </option>
        ));
    };

    const renderMonths = () => {
        return Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
        ));
    };

    const renderYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 100 }, (_, i) => (
            <option key={currentYear - i} value={currentYear - i}>
                {currentYear - i}
            </option>
        ));
    };

    return (
        <div className={`flex space-x-2 ${className}`}>
            <select
                ref={dayRef}
                onChange={handleChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                id="day-select"
                name="day-select"
                {...props}
            >
                <option value="">Day</option>
                {renderDays()}
            </select>
            <select
                ref={monthRef}
                onChange={handleMonthChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                id="month-select"
                name="month-select"
                {...props}
            >
                <option value="">Month</option>
                {renderMonths()}
            </select>
            <select
                ref={yearRef}
                onChange={handleYearChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                id="year-select"
                name="year-select"
                {...props}
            >
                <option value="">Year</option>
                {renderYears()}
            </select>
        </div>
    );
});

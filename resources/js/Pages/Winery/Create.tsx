import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import { ANDALUSIA_PROVINCES } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: '',
        city: '',
        province: '',
        error: '',
    });

    const onSubmitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('winery.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create new winery
                </h2>
            }
        >
            <Head title="Create new winery" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {errors.error && (
                        <div className="mb-4 rounded bg-red-500 px-4 py-2 text-white">
                            {errors.error}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form
                            onSubmit={onSubmitHandler}
                            className="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="winery_name"
                                    value="Winery Name"
                                />
                                <TextInput
                                    id="winery_name"
                                    name="name"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="winery_city"
                                    value="City"
                                />
                                {/* <TextInput
                                    id="winery_city"
                                    name="city"
                                    value={data.city}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                /> */}
                                <TextAreaInput
                                    id="winery_city"
                                    name="city"
                                    value={data.city}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.city}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="winery_province"
                                    value="Province"
                                />

                                <SelectInput
                                    id="winery_province"
                                    name="province"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('province', e.target.value)
                                    }
                                >
                                    <option value="">Select a province</option>
                                    {ANDALUSIA_PROVINCES.map((province) => (
                                        <option
                                            key={province.value}
                                            value={province.value}
                                        >
                                            {province.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.city}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 flex flex-row items-center justify-end gap-6">
                                <Link
                                    href={route('winery.index')}
                                    className="rounded bg-gray-100 px-3 py-1 text-gray-800 shadow transition-all hover:bg-gray-200"
                                >
                                    Cancel
                                </Link>
                                <button className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

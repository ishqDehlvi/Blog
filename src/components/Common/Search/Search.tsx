import Router from "next/router";
import { FC, useRef } from "react";
import {
    AriaSearchFieldProps,
    FocusableOptions,
    useSearchField,
} from "react-aria";
import { FaSearch } from "react-icons/fa";
import { useSearchFieldState } from "react-stately";

export interface SearchProperties
    extends AriaSearchFieldProps,
        FocusableOptions {}

export const Search: FC<SearchProperties> = (properties) => {
    const ref = useRef<HTMLInputElement>(null);
    const state = useSearchFieldState(properties);
    const { inputProps } = useSearchField(properties, state, ref);

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = () => {
        if (ref.current?.value == undefined || ref.current?.value == "") {
            return;
        }

        Router.push(`/search?q=${encodeURIComponent(ref.current?.value)}`);
    };

    return (
        <form
            action="/search"
            method="GET"
            ref={formRef}
            onSubmit={(event) => {
                event.preventDefault();

                onSubmit();
            }}
        >
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-400">
                    <FaSearch />
                </div>
                <input
                    {...inputProps}
                    ref={ref}
                    name="q"
                    onKeyDown={(event) => {
                        if (event.key == "Enter") {
                            onSubmit();
                        }
                    }}
                    className="block p-4 pr-24 pl-10 w-full text-sm text-gray-900 bg-gray-100 !rounded-lg border border-gray-300"
                />
                <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

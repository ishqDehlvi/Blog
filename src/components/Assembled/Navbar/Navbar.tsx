import { Container } from "@components/Common/Container/Container";
import { Hyperlink } from "@components/Common/Hyperlink/Hyperlink";
import { Search } from "@components/Common/Search/Search";
import { cx } from "@lib/utils";
import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { AboutText } from "../AboutText/AboutText";

export const Navbar: FC = () => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="w-ful p-5 px-1 sm:px-5 sticky top-0 left-0 border-b border-gray-300 bg-white z-50">
                {/* bg-slate-100 */}
                <Container padding>
                    <div className="flex justify-between">
                        <div className="flex gap-4 sm:gap-8 items-center">
                            <img
                                src="/robot.png"
                                alt="Robot"
                                className="h-14 rounded-full"
                            />
                            <div className="flex gap-2 sm:gap-4">
                                <Hyperlink
                                    nodefaultstyle
                                    href="https://robiot.dev"
                                    className="text-xl hover:underline"
                                >
                                    robiot
                                </Hyperlink>
                                <span className="text-xl">/</span>
                                <Hyperlink
                                    nodefaultstyle
                                    href="/"
                                    className="text-xl hover:underline"
                                >
                                    blog
                                </Hyperlink>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 sm:gap-10">
                            <div className="hidden md:block">
                                <Search
                                    placeholder="Search..."
                                    aria-label="Search Bar"
                                />
                            </div>

                            <div className="block md:hidden">
                                <button
                                    aria-label="Toggle Search Bar"
                                    onClick={() => {
                                        setMobileSearchOpen(!mobileSearchOpen);
                                    }}
                                    className="text-xl"
                                >
                                    <FaSearch />
                                </button>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    aria-label="Toggle Search Bar"
                                    onClick={() => {
                                        setMenuOpen(!menuOpen);
                                    }}
                                >
                                    <div
                                        className={cx(
                                            "toggle-dropdown",
                                            menuOpen && "open"
                                        )}
                                    >
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {mobileSearchOpen && (
                <div className="p-6 fixed z-50 w-full bg-white border-b border-gray-300">
                    <Search placeholder="Search..." aria-label="Search Bar" />
                </div>
            )}

            <div
                className={cx(
                    "bg-white h-full w-full -inset-full top-0 fixed z-40 flex flex-col justify-center transition-all duration-500",
                    menuOpen && "left-0",
                    "px-10",
                    "block md:hidden"
                )}
            >
                <AboutText />
            </div>
        </>
    );
};

import { FC, ReactNode } from "react";

import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";

export const Layout: FC<{ children: ReactNode; footerMarginTop?: boolean }> = (
    properties
) => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between min-h-screen">
                {properties.children}

                <div className="flex-1"></div>
                <Footer />
            </div>
        </>
    );
};

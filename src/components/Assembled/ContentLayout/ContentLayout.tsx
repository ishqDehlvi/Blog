import { Container } from "@components/Common/Container/Container";
import { cx } from "@lib/utils";
import { FC, ReactNode } from "react";

import { AboutText } from "../AboutText/AboutText";

export const ContentLayout: FC<{
    children: ReactNode;
    className?: string;
    border?: boolean;
}> = (properties) => {
    return (
        <Container padding>
            <div
                className={cx(
                    properties.className,
                    "mt-10 flex w-full gap-7 flex-col main:flex-row"
                )}
            >
                <div className="flex flex-col w-full gap-10">
                    {properties.children}
                </div>

                <div
                    className={cx(
                        "border-l border-gray-200",
                        properties.border
                            ? "border-gray-200"
                            : "border-transparent"
                    )}
                ></div>

                <div className="sticky top-32 left-0 w-80 min-w-min h-10 hidden main:block">
                    <AboutText />
                </div>
            </div>
        </Container>
    );
};

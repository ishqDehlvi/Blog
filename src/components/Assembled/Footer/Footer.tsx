import { Container } from "@components/Common/Container/Container";
import { Hyperlink } from "@components/Common/Hyperlink/Hyperlink";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <div className="mt-24 flex w-full py-10 bg-gray-50 border-t border-gray-300">
            <Container>
                <div className="px-4 flex flex-col text-center gap-10 md:text-left md:flex-row md:justify-between">
                    <span className="text-gray-500">
                        Copyright © 2022 Robiot. All rights reserved.
                    </span>
                    <span className="text-gray-500">
                        Made without ♥ in Next.js ;){" "}
                        <Hyperlink
                            href="https://github.com/robiot/blog"
                            target="_blank"
                        >
                            Source Code
                        </Hyperlink>
                    </span>
                </div>
            </Container>
        </div>
    );
};

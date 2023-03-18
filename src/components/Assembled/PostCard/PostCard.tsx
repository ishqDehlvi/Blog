import { Hyperlink } from "@components/Common/Hyperlink/Hyperlink";
import { PostBase } from "@lib/types";
import { cx, formatDate } from "@lib/utils";
import Image from "next/future/image";
import { FC } from "react";

export const PostCard: FC<{
    size?: "large" | "normal";
    data: PostBase;
    className?: string;
}> = (properties) => {
    return (
        <div
            className={cx(
                properties.size == "large" ? "gap-5" : "gap-2",
                "w-full flex flex-col",
                properties.className
            )}
        >
            <Hyperlink
                href={properties.data.link}
                aria-label="Blog Image"
                nodefaultstyle
            >
                <div className="relative overflow-hidden aspect-video rounded-lg w-full bg-slate-200">
                    <Image
                        src={properties.data.cover}
                        alt="Blog Post"
                        className="object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
                        loading={properties.size == "large" ? "eager" : "lazy"}
                        fill
                    />
                </div>
            </Hyperlink>
            <p>{formatDate(properties.data.date)}</p>

            <h3 className="max-w-fit">
                <Hyperlink
                    nodefaultstyle
                    href={properties.data.link}
                    className={cx(
                        properties.size == "large" ? "text-5xl" : "text-2xl",
                        "font-bold hover:text-blue-600 hover:underline cursor-pointer leading-tight"
                    )}
                >
                    {properties.data.title}
                </Hyperlink>
            </h3>

            <span
                className={cx(
                    properties.size == "large" ? "text-xl" : "text-md",
                    "text-gray-700 font-medium max-w-fit"
                )}
            >
                {properties.data.description}
            </span>
        </div>
    );
};

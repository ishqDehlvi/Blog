import { cx } from "@lib/utils";
import Link from "next/link";
import { ComponentProps, FC, ReactNode, useRef } from "react";
import { AriaLinkOptions, FocusableOptions, useLink } from "react-aria";

export interface HyperlinkProperties extends AriaLinkOptions, FocusableOptions {
    nodefaultstyle?: boolean;
    href: string;
    target?: ComponentProps<"a">["target"];

    children?: ReactNode;
    className?: string;
}

export const Hyperlink: FC<HyperlinkProperties> = (properties) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const { linkProps } = useLink(properties, ref);

    return (
        <Link href={properties.href} passHref>
            <a
                {...linkProps}
                ref={ref}
                target={properties.target}
                className={cx(
                    !properties.nodefaultstyle &&
                        "text-blue-600 hover:underline",
                    properties.className
                )}
            >
                {properties.children}
            </a>
        </Link>
    );
};

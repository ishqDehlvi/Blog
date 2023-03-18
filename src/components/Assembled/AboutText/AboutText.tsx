import { Hyperlink } from "@components/Common/Hyperlink/Hyperlink";
import { cx } from "@lib/utils";
import { FC } from "react";

import { ContactIcons } from "../ContactIcons/ContactIcons";

export interface AboutTextProperties {
    className?: string;
}

export const AboutText: FC<AboutTextProperties> = (properties) => {
    return (
        <div className={cx("flex flex-col gap-7", properties.className)}>
            <h3 className="text-5xl">Blog</h3>
            <p className="text-xl">
                Hello I'm Elliot. This is the place for my blogposts. Check out
                my{" "}
                <Hyperlink href="https://robiot.dev">normal website</Hyperlink>{" "}
                for non blog related stuff.
            </p>
            <ContactIcons />
        </div>
    );
};

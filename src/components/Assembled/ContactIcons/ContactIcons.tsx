import { Hyperlink } from "@components/Common/Hyperlink/Hyperlink";
import { FC } from "react";
import { FaGithub, FaGlobeEurope } from "react-icons/fa";

export const ContactData = [
    {
        name: "Github",
        to: "https://github.com/robiot",
    },
    {
        name: "Website",
        to: "https://robiot.dev",
    },
];

export const ContactIcons: FC = () => {
    return (
        <div className="flex gap-5">
            {ContactData.map((item) => {
                return (
                    <Hyperlink
                        nodefaultstyle
                        key={`contact_icon_${item.name}`}
                        href={item.to}
                        target="_blank"
                        aria-label={item.name}
                        className="text-3xl"
                    >
                        {item.name == "Github" && <FaGithub />}
                        {item.name == "Website" && <FaGlobeEurope />}
                    </Hyperlink>
                );
            })}
        </div>
    );
};

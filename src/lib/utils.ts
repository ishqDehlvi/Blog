import classNames from "classnames";

export const cx = (...args: classNames.ArgumentArray) => classNames(...args);

export const formatDate = (date: string) => `${new Date(
    date
).toLocaleDateString("en-US", {
    month: "long",
})}
${new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
})},
${new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
})}`;

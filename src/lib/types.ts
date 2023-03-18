export type PostBase = {
    title: string;
    link: string;
    description: string;
    date: string;
    cover: string;
    color: "blue" | "green" | "red" | "purple" | "gray";
};

export type Post = PostBase & {
    slug: string;
    content: string;
};

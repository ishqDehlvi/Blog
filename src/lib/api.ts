import { Post } from "@lib/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export const postsDirectory = path.join(process.cwd(), "posts");
// export const blogImgPath = path.join(process.cwd(), "public/generated");

export const getPostImagesBySlug = (slug: string) =>
    fs
        .readdirSync(path.join(postsDirectory, slug), { withFileTypes: true })
        .filter((item) => item.isFile() && !item.name.endsWith(".md"))
        .map((item) => {
            return {
                path: path.join(postsDirectory, slug, item.name),
                name: item.name,
            };
        });

export const getAllSlugs = () =>
    fs
        .readdirSync(postsDirectory, { withFileTypes: true })
        .filter((item) => item.isDirectory() && !item.name.startsWith("."))
        .map((dirent) => dirent.name);

const generateData = (slug: string, data: Record<string, any>) => {
    return {
        slug,
        cover: `/generated/${slug}/${data.cover}`,
        color: data.color != undefined ? data.color : "blue",
        link: `/post/${slug}`,
    };
};

export const getPostBySlug = (slug: string): Omit<Post, "content"> => {
    const fullPath = path.join(path.join(postsDirectory, slug, "index.md"));

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
        ...data,
        ...generateData(slug, data),
    } as any;
};

export const getPostBySlugWithContent = (slug: string): Post => {
    const fullPath = path.join(path.join(postsDirectory, slug, "index.md"));

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        ...data,
        content,
        ...generateData(slug, data),
    } as Post;
};

export const getAllPosts = () => {
    const slugs = getAllSlugs();

    return slugs
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) =>
            new Date(post1.date) > new Date(post2.date) ? -1 : 1
        );
};

export const searchPost = (query_raw: string) => {
    const posts = getAllPosts();

    const query = query_raw.toLowerCase();

    // console.log(query);

    return posts.filter(
        (o) =>
            o.title.toLowerCase().includes(query) ||
            o.description.toLowerCase().includes(query)
    );
};

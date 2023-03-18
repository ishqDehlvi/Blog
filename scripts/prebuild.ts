console.log("Running prebuild");

import fs from "fs";
import path from "path";

import { getAllPosts, getPostImagesBySlug } from "../src/lib/api";

export const ensureFolder = (slug: string) => {
    const blogImgPath = path.join(process.cwd(), "public/generated", slug);

    if (!fs.existsSync(blogImgPath)) {
        fs.mkdirSync(blogImgPath, { recursive: true });
    } else {
        fs.rmSync(blogImgPath, { recursive: true, force: true });
        fs.mkdirSync(blogImgPath, { recursive: true });
    }
};

export const copyToPublic = (from: string, slug: string, filename: string) => {
    const blogImgPath = path.join(process.cwd(), "public/generated", slug);

    fs.copyFileSync(from, path.join(blogImgPath, filename));
};

getAllPosts().map((post) => {
    ensureFolder(post.slug);

    getPostImagesBySlug(post.slug).map((image) =>
        copyToPublic(image.path, post.slug, image.name)
    );
});

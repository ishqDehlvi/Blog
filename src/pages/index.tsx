import { ContentLayout } from "@components/Assembled/ContentLayout/ContentLayout";
import { Layout } from "@components/Assembled/Layout/Layout";
import { PostCard } from "@components/Assembled/PostCard/PostCard";
import { getAllPosts } from "@lib/api";
import { Post } from "@lib/types";
import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

interface PageProps {
    posts: Omit<Post, "content">[];
}

const HomePage: NextPage<PageProps> = (properties) => {
    const [latestPost] = properties.posts;

    return (
        <Layout>
            <NextSeo
                title="robiot - Blog"
                description={
                    "Updates, writeups and tutorials are stuff that you can find on Robiot's blog"
                }
                openGraph={{
                    url: "https://blog.robiot.dev",
                    type: "image/png",
                    images: [
                        {
                            url: "/og/cover.png",
                            width: 1406,
                            height: 803,
                            alt: "Image",
                            type: "image/png",
                        },
                    ],
                    site_name: "Robiot's Blog",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />

            <ContentLayout>
                {latestPost != undefined ? (
                    <PostCard size="large" data={latestPost} />
                ) : (
                    <span>No latest post found</span>
                )}

                <div className="w-full h-1 bg-gray-200" />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {properties.posts.map((post, index) => {
                        if (index == 0) return;

                        return <PostCard key={index} data={post} />;
                    })}
                </div>
            </ContentLayout>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = () => {
    const posts = getAllPosts();

    return {
        props: {
            posts,
        },
    };
};

export default HomePage;

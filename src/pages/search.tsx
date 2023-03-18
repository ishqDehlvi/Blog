/* eslint-disable unicorn/no-null */
import { ContentLayout } from "@components/Assembled/ContentLayout/ContentLayout";
import { Layout } from "@components/Assembled/Layout/Layout";
import { PostCard } from "@components/Assembled/PostCard/PostCard";
import { searchPost } from "@lib/api";
import { Post } from "@lib/types";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";

interface PageProps {
    searchQuery: string | null;
    matches: Omit<Post, "content">[] | null;
}

const HomePage: NextPage<PageProps> = (properties) => {
    if (
        properties.searchQuery == undefined ||
        properties.matches == undefined
    ) {
        return <>Invalid request</>;
    }

    return (
        <Layout>
            <NextSeo
                title="robiot - Blog - Search"
                description={"Search for blog posts on Robiot's blog"}
                openGraph={{
                    url: "https://blog.robiot.dev/search",
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
                <div className="flex flex-col flex-1 gap-10">
                    <h3 className="text-5xl font-bold">
                        Search results for '{properties.searchQuery}'
                    </h3>

                    {properties.matches.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {properties.matches.map((post, index) => (
                                <PostCard key={index} data={post} />
                            ))}
                        </div>
                    ) : (
                        <p>
                            No posts were found matching the given search query
                            :(
                        </p>
                    )}
                </div>
            </ContentLayout>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
    properties
) => {
    let searchQuery: string | undefined;

    if (
        properties.query != undefined &&
        properties.query.q != undefined &&
        typeof properties.query.q == "string"
    ) {
        searchQuery = properties.query.q;
    }

    let matches: Omit<Post, "content">[] | undefined;

    if (searchQuery != undefined) {
        matches = searchPost(searchQuery);
    }

    return {
        props: {
            searchQuery:
                searchQuery == undefined || searchQuery == ""
                    ? null
                    : searchQuery,
            matches: matches == undefined ? null : matches,
        },
    };
};

export default HomePage;

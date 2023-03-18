import { ContentLayout } from "@components/Assembled/ContentLayout/ContentLayout";
import { Layout } from "@components/Assembled/Layout/Layout";
import { Container } from "@components/Common/Container/Container";
import { Hyperlink } from "@components/Common/Hyperlink/Hyperlink";
import { getAllPosts, getPostBySlugWithContent } from "@lib/api";
import { Post } from "@lib/types";
import { cx, formatDate } from "@lib/utils";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { FC, useEffect, useId, useState } from "react";
import ReactLinkify from "react-linkify";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface IParams extends ParsedUrlQuery {
    slug: string;
}

interface PageProps {
    post: Post;
}

const CodeBlock: FC<{ data: CodeProps }> = (properties) => {
    const [height, setHeight] = useState<number>();
    const id = useId();

    const match = /language-(\w+)/.exec(properties.data.className || "");

    useEffect(() => {
        const cHeight = document.querySelector(`[id='${id}']`)?.clientHeight;

        if (cHeight == undefined) {
            return;
        }

        setHeight(cHeight + 20);
    }, []);

    return (
        <div
            className="relative my-4"
            style={{
                height,
            }}
        >
            <SyntaxHighlighter
                id={id}
                language={match == undefined ? undefined : match[1]}
                PreTag="div"
                children={String(properties.data.children).replace(/\n$/, "")}
                className={cx(
                    "w-full max-w-full overflow-auto p-5 !bg-gray-100 !font-[inherit] !text-base whitespace-nowrap",
                    height != undefined && "absolute"
                )}
                showLineNumbers={true}
            />
        </div>
    );
};
const PostSlugPage: NextPage<PageProps> = (properties) => {
    return (
        <Layout>
            <NextSeo
                title={`robiot - ${properties.post.title}`}
                description={properties.post.description}
                openGraph={{
                    url: "https://blog.robiot.dev",
                    type: "image/png",
                    images: [
                        {
                            url: properties.post.cover,
                            // width: 1406,
                            // height: 803,
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

            <div
                className={cx(
                    "h-[80vh] flex flex-col justify-center",
                    properties.post.color == "blue" && "bg-blue-200",
                    properties.post.color == "green" && "bg-lime-200",
                    properties.post.color == "red" && "bg-rose-200",
                    properties.post.color == "purple" && "bg-indigo-200",
                    properties.post.color == "gray" && "bg-gray-200"
                )}
            >
                <Container size="small">
                    <div className="px-10 flex flex-col gap-6">
                        <h1 className="text-7xl font-bold leading-tight">
                            {properties.post.title}
                        </h1>
                        <h3 className="text-2xl font-medium text-gray-500">
                            {properties.post.description}
                        </h3>
                        <p className="text-xl font-medium text-gray-500">
                            {formatDate(properties.post.date)}
                        </p>
                    </div>
                </Container>
            </div>

            <ContentLayout className="min-h-[100rem]" border>
                <div className="break-words">
                    <ReactMarkdown
                        components={{
                            img: (props) => {
                                const imgurl = /\/*(\/)\w*\1\/*/g.test(
                                    props.src!
                                )
                                    ? props.src!
                                    : path.join(
                                          "/generated",
                                          properties.post.slug,
                                          props.src!
                                      );

                                return (
                                    <img
                                        src={imgurl}
                                        className="my-4"
                                        alt={props.alt}
                                    />
                                );
                            },
                            code(props) {
                                return !props.inline ? (
                                    <CodeBlock data={props} />
                                ) : (
                                    <div
                                        className={cx(
                                            "inline-block rounded bg-gray-200 px-1 py-[0.1rem]",
                                            props.className
                                        )}
                                        children={String(
                                            props.children
                                        ).replace(/\n$/, "")}
                                    />
                                );
                            },
                            ol: (props) => (
                                <ol className="pl-4">
                                    {props.children
                                        .filter(
                                            (child) => typeof child != "string"
                                        )
                                        .map((child, index) => {
                                            return (
                                                <span
                                                    className="flex gap-2 text-normal"
                                                    key={`ol_list_${index}`}
                                                >
                                                    {index}.{child}
                                                </span>
                                            );
                                        })}
                                </ol>
                            ),
                            a: (props) => (
                                <Hyperlink
                                    target="_blank"
                                    href={props.href!}
                                    key={props.key}
                                >
                                    {props.children}
                                </Hyperlink>
                            ),

                            h1: (props) => (
                                <h1 className="text-5xl font-bold pb-4 pt-7">
                                    {props.children}
                                </h1>
                            ),
                            h2: (props) => (
                                <h2 className="text-4xl font-bold pb-4 pt-7">
                                    {props.children}
                                </h2>
                            ),
                            h3: (props) => (
                                <h3 className="text-4xl font-bold pb-4 pt-7">
                                    {props.children}
                                </h3>
                            ),
                            h4: (props) => (
                                <h4 className="text-3xl font-bold pb-2 pt-5">
                                    {props.children}
                                </h4>
                            ),
                            p: (props) => (
                                <ReactLinkify
                                    componentDecorator={(
                                        decoratedHref,
                                        decoratedText,
                                        key
                                    ) => {
                                        return (
                                            <Hyperlink
                                                target="_blank"
                                                href={decoratedHref}
                                                key={key}
                                            >
                                                {decoratedText}
                                            </Hyperlink>
                                        );
                                    }}
                                >
                                    <p className="text-normal py-2">
                                        {props.children}
                                    </p>
                                </ReactLinkify>
                            ),
                        }}
                    >
                        {properties.post.content}
                    </ReactMarkdown>
                </div>
            </ContentLayout>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const { slug } = context.params as IParams;

    const post = getPostBySlugWithContent(slug);

    return {
        props: {
            post,
        },
    };
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
    const posts = getAllPosts();

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
};

export default PostSlugPage;

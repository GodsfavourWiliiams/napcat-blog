import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from '@/component/header';
import Footer from '@/component/footer';

import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);

  return (
    <>
      <Head>
        <title>Napcat Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="px-10 mx-auto space-y-5 bg-gray-100 sm:p-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-xl font-sans text-3xl">
            Napcat Blog 
          </h1>
          <h2 className="pt-5 font-sans text-black cursor-pointer text-sm">
            {"Stay up to date with the latest stories and commentary brought to you by Binance, the world's leading blockchain and crypto ecosystem."}
          </h2>
        </div>

      </div>
      {/* posts */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6 mx-auto max-w-[1300px]">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="hover:bg-gray-100 p-5 rounded-md">
                <div className="">
                  <img
                    src={urlFor(post.mainImage).url()!} 
                    className="rounded-md h- w-full"
                    alt=""
                  />
                </div>
                <div className="py-5">
                    <h2 className="text-lg font-bold" title={post.description}>{post.title}</h2>
                    <p className="text-base bg-gray-500" title={post.description}>{post.description}</p>
                </div>
                <div className="">
                  <span>{post._createdAt}</span>
                </div>
              </div>
            
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
     name,
     image
    },
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true
 ],
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};

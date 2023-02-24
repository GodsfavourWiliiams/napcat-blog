import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from '../component/header';
import Footer from '@/component/footer';
import { sanityClient, urlFor } from "../lib/sanity";
import { Post } from "../typings";
import { useState } from 'react';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  
  const [isArchiving, setIsArchiving] = useState(false);
  const activePosts = posts.filter((post) => !post.isArchived);
  const [data, setData] = useState<Post[]>([]);
  console.log('active:', activePosts);


  const handleArchive = async (id: string) => {
    setIsArchiving(true);
  
    try {
      const response = await fetch(`/api/archive-post?id=${id}`, {
        method: 'POST'
      });
  
      if (response.ok) {
        const updatedPosts = [...posts];
        const postIndex = updatedPosts.findIndex(post => post._id === id);
        updatedPosts[postIndex].isArchived = true;
        setData(updatedPosts);
        
        await sanityClient.patch(id).set({ isArchived: true }).commit();

      } else {
        alert('Error archiving post');
      }
    } catch (error) {
      console.error(error);
      alert('Error archiving post');
    }
  
    setIsArchiving(false);
  };
  

  return (
    <>
      <Head>
        <title>Napcat Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    <div className="">
      <div className="px-8 space-y-5 bg-gray-100 sm:p-10">
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
        {activePosts.map((post) => (
          <div key={post._id} className='h-full'>
            <div className="hover:bg-gray-100 p-5 rounded-md h-full">
                <div className="">
                  <img
                    src={urlFor(post.mainImage).url()!} 
                    className="rounded-md h- w-full"
                    alt=""
                  />
                </div>
                <Link href={`/post/${post.slug.current}`}>
                  <div className="py-5">
                     <h2 className="text-lg font-bold" title={post.description}>{post.title}</h2>
                    <p className="text-base bg-gray-500" title={post.description}>{post.description}</p>
                  </div>
                   
                </Link>
                <div className="">
                  <span>{post._createdAt}</span>
                  <button onClick={() => handleArchive(post._id)} disabled={isArchiving} className=''>
                    {isArchiving ? 'Archiving...' : 'Archive'}
                  </button>
                </div>
              </div>
            
          </div>
        ))}
      </div>
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
    isArchived,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };

};

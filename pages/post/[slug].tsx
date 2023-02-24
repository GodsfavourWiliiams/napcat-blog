import React from "react";
import { sanityClient, urlFor } from "../../lib/sanity";
import { Post } from "../../typings";
import Header from "../../component/header";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Head from "next/head";
import Link from 'next/link';
// import Image from 'next/image'

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string[];
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post)

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    // console.log(data)
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        // console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main className="max-w-7xl mx-auto" >
        <Head>
          <title>{post.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

      <Header />
     
      
      <article className="font-sans p-5">
        <h1 className="mt-10 mb-3 text-3xl font-bold">{post.title}</h1>
        <h2 className="mb-2 text-2xl font-medium text-gray-300">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).url()!}
            className="w-10 h-10 rounded-full"
            // width={'100'}
            // height={'100'}
            alt=''
          />
          <p className="text-sm font-extralight">
             {new Date(post._createdAt).toLocaleString()}
          </p>
       
        </div>
        <div className="py-10">
           <img
          className="object-cover w-full h-full rounded-lg"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />
        </div>
       
        <div>
          <PortableText
            className="mt-10 text-xl text-gray-900"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-3xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-2xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc"> {children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          ></PortableText>
        </div>
      </article>

      <hr className="max-w-lg mx-auto my-5 border border-gray-500" />

      {submitted ? (
        <div className="flex flex-col max-w-2xl px-10 py-10 mx-auto my-10 text-white bg-yellow-500">
          <h3 className="text-3xl font-bold">
            Your comment has been submitted!
          </h3>
          <p> Once it has been approved, it will appear below</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-auto max-w-2xl p-5  mb-10"
        >
          <h3 className="text-sm text-black">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700"> Name </span>
            <input
              {...register("name", { required: true })}
              className="block w-full px-3 py-3 mt-1 border rounded  outline-none form-input"
              placeholder="Name"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700"> Email </span>
            <input
              {...register("email", { required: true })}
              className="block w-full px-3 py-3 mt-1 border rounded outline-none form-input "
              placeholder="Email"
              type="email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700"> Comment </span>
            <textarea
              {...register("comment", { required: true })}
              className="block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-textarea "
              placeholder="Comment"
              rows={8}
            />
          </label>

          {/* errors will return when field validation fails */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500"> The Name is required</span>
            )}
            {errors.email && (
              <span className="text-red-500"> The Email is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500"> The Comment is required</span>
            )}
          </div>
          <input
            type="submit"
            className="px-4 py-2 font-bold text-white bg-black rounded shadow cursor-pointer hover:bg-yellow-400 focus:shadow-outline focus:outline-none"
          />
        </form>
      )}

     
    </main>
  );
}

export default Post;

// Inside [slug].tsx at the bottom

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id,
       slug {
        current
      }
      }`;

  const posts = await sanityClient.fetch(query);


  const paths = posts.map((post: Post) => ({
    // This means I'm going to directly return an object
    // The first one:
    params: {
      // The second one; is going to be the params that matches up to [slug]
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    // This will block the page from not showing or showing a 404 if it doesn't exist
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        'comments' : *[_type == "comment" &&
          post._ref == ^._id &&
          approved== true],
        description,
        mainImage,
        slug,
        body
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds it will update the old cached version
  };
};

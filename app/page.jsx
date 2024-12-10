import React from "react";
import Head from "next/head";
import BlogPage from "@/components/blogpage";
import Newsletter from "@/components/newletter";
import PopularBlogs from "@/components/PopularBlogs";

function Home() {
  return (
    <>
      <Head>
        <title>Ziprus Chemicals Blog - Solid Minerals & Technologies</title>
        <meta
          name="description"
          content="Stay updated with the latest industrial solid minerals and technologies news. Ziprus Chemicals Blog provides expert insights, trends, and innovations in the solid mineral industry."
        />
        <meta name="keywords" content="solid minerals, industrial minerals, mineral production, Ziprus Chemicals, mineral technologies, mining industry news" />
        <meta name="author" content="Ziprus Chemicals" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.zipruschemicals.com/blog" />
      </Head>
      <main>
        <BlogPage />
        <Newsletter />
        <PopularBlogs />
      </main>
    </>
  );
}

export default Home;

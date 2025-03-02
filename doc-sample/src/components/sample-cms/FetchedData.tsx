import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Markdown from "react-markdown";

const CMSContent = ({ slug }: { slug: string }) => {
  const [data, setData] = useState<{ title: string; content: string }>(
    {} as { title: string; content: string }
  );

  const fetchPosts = async () => {
    const supabase = createClient(
      "https://hsvrcbbtkfnvlfifuugy.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdnJjYmJ0a2ZudmxmaWZ1dWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NTMzNDQsImV4cCI6MjA1NTUyOTM0NH0.qgDahw4AJf6Io1Hcy9wrWHo-VVgg2d5hjrThHFGTIx8"
    );
    const { data, error } = await supabase.from("posts").select("*")
      .eq("slug", slug);
    if (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
    return data;
  };

  useEffect(() => {
    fetchPosts().then((data) => {
      setData(data[0]);
    });
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>CMSから取得したデータ</p>
      {/* <div dangerouslySetInnerHTML={{ __html: data.content }} /> */}

      <Markdown>{data.content}</Markdown>
    </div>
  );
};

export default CMSContent;

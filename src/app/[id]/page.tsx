"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

function page({ params }: { params: { id: number } }) {
  const [comment, setComment] = useState("");
  const [writer, setWriter] = useState("");
  const [memoData, setMemoData] = useState<{
    id: number;
    writer: string;
    content: string;
    createdAt: string;
  }>();
  const [commentData, setCommentData] = useState<
    {
      id: number;
      content: string;
      createdAt: string;
      writer: string;
    }[]
  >([]);

  // 한 데이터 불러오기
  async function fetchData() {
    try {
      const response = await fetch(`/api/post?id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("반환된 데이터:", data);
        setMemoData(data);
      } else {
        console.error("API 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  // 댓글 데이터 불러오기
  async function fetchCommentData() {
    try {
      const response = await fetch(`/api/comment?id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("반환된 데이터:", data);
        setCommentData(data);
      } else {
        console.error("API 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  // 전송
  async function postData({
    content,
    writer,
  }: {
    content: string;
    writer: string;
  }) {
    setComment("");
    setWriter("");
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, id: params.id, writer }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("POST 요청 성공, 서버 응답 데이터:", responseData);
        await fetchCommentData();
      } else {
        console.error("POST 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  // 삭제
  async function deleteData(id: number) {
    try {
      const response = await fetch(`/api/comment?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("POST 요청 성공, 서버 응답 데이터:", responseData);
        await fetchCommentData();
      } else {
        console.error("POST 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchCommentData();
  }, []);

  return (
    <div>
      <Link href="/">
        <button>돌아가기</button>
      </Link>
      <div>{memoData?.content}</div>
      <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
        <div>댓글</div>
        <input
          placeholder="내용"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          placeholder="작성자"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
        <button onClick={() => postData({ content: comment, writer })}>
          전송
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        {commentData.map((commentInfo) => {
          return (
            <div
              style={{
                borderRadius: "4px",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                padding: "16px",
                gap: "8px",
              }}
              key={commentInfo.id}
            >
              <div style={{ color: "aqua" }}>{commentInfo.writer}</div>
              <div style={{ color: "white" }}>{commentInfo.content}</div>
              <div style={{ color: "white" }}>
                {commentInfo.createdAt.slice(11, 16)}
              </div>
              <button onClick={() => deleteData(commentInfo.id)}>삭제</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;

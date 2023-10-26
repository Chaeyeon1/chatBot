"use client";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [memoData, setMemoData] = useState<
    {
      id: number;
      writer: number;
      content: string;
      createdAt: string;
    }[]
  >([]);

  async function fetchData() {
    try {
      const response = await fetch("/api");
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

  async function postData({
    content,
    writer,
  }: {
    content: string;
    writer: string;
  }) {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, writer }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("POST 요청 성공, 서버 응답 데이터:", responseData);
        await fetchData();
      } else {
        console.error("POST 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  async function deleteData(id: number) {
    const data = {
      id,
    };

    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("POST 요청 성공, 서버 응답 데이터:", responseData);
        await fetchData();
      } else {
        console.error("POST 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={content}
        placeholder="내용"
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        value={writer}
        placeholder="작성자"
        onChange={(e) => setWriter(e.target.value)}
      />
      <button onClick={() => postData({ content, writer })}>추가</button>
      {memoData.map((memoInfo) => {
        return (
          <div
            style={{
              width: "200px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "auto",
              flexDirection: "column",
              backgroundColor: "lightyellow",
            }}
            key={memoInfo.id}
          >
            <div style={{ color: "black" }}>{memoInfo.content}</div>
            <div style={{ color: "black" }}>작성자 : {memoInfo.writer}</div>
            <div style={{ color: "black" }}>
              날짜 : {memoInfo.createdAt.slice(0, 10)}
            </div>
            <button onClick={() => deleteData(memoInfo.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

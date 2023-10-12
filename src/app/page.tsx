"use client";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [money, setMoney] = useState(0);
  const [moneyData, setMoneyData] = useState<
    {
      id: number;
      money: number;
      date: string;
    }[]
  >([]);

  async function fetchData() {
    try {
      const response = await fetch("/api");
      if (response.ok) {
        const data = await response.json();
        console.log("반환된 데이터:", data);
        setMoneyData(data);
      } else {
        console.error("API 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  }

  async function postData(money: number) {
    const data = {
      money,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("POST 요청 성공, 서버 응답 데이터:", responseData);
        fetchData();
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
        fetchData();
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
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
      />
      <button onClick={() => postData(money)}>추가</button>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>돈</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {moneyData.map((moneyInfo) => {
            return (
              <tr key={moneyInfo.id}>
                <td>{moneyInfo.id}</td>
                <td>{moneyInfo.money}원</td>
                <td>{moneyInfo.date.slice(0, 10)}</td>
                <td>
                  <button onClick={() => deleteData(moneyInfo.id)}>삭제</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>총 합계</td>
            <td>
              {moneyData.reduce((total, item) => total + item.money, 0)}원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;

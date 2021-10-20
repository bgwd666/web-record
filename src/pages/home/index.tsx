import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import webRecord from "/src/helper/record";
import JSVideo from "/src/helper/video";

const Home = () => {
  const [cardList, setCardList] = useState<number[]>([1]);
  const pageRecord = new webRecord();
  let video = useRef();

  useEffect(() => {
    // pageRecord.init()
    //@ts-ignore
    // video.current = new JSVideo();
  }, []);

  //开始录制
  const handleStartRecord = () => {
    //@ts-ignore
    video.current = new JSVideo();
  };

  //结束录制并回放
  const handleReplayRecord = () => {
    //@ts-ignore
    video.current.createIframe();
  };

  //添加卡片
  const handleAddCard = () => {
    setCardList([...cardList, cardList.length + 1]);
    (
      document.querySelector(".card-item") as any
    ).style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
  };

  //重置卡片
  const handleResetCard = () => {
    setCardList([1]);
  };

  return (
    <>
      <header className="font-size-32 text-center mt-24">web record</header>
      <section className="box-cont mt-24">
        <div className="flex-center mt-24">
          <button className="theme-btn" onClick={handleStartRecord}>
            Start Record
          </button>
          <button className="theme-btn ml-16" onClick={handleReplayRecord}>
            Replay Record
          </button>
          <button className="theme-btn ml-16" onClick={handleAddCard}>
            Add Card
          </button>
          <button className="theme-btn ml-16" onClick={handleResetCard}>
            Reset
          </button>
        </div>

        <ul className="mt-24 flex flex-wrap card-cont">
          {cardList.map((it) => (
            <li className="flex-center card-item" key={it}>
              {it}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;

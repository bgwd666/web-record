import React, { useState } from 'react';
import { IRecordInfo } from '/src/helper/publicType';
import './index.less';
import ReplayRecord from '/src/helper/replay';
import { useHistory } from 'react-router-dom';

const Replay = () => {
  const [showClose, setShowClose] = useState(false);
  const replayRecord = new ReplayRecord();
  const recordList: IRecordInfo[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  const history = useHistory();

  // 播放指定录屏记录
  const handleReplayRecord = (it: IRecordInfo) => {
    console.log(it);
    replayRecord.init(it.initDom, it.actionList);
    setShowClose(true);
  };

  // 关闭当前录屏播放
  const handleCloseCurrentReplay = () => {
    setShowClose(false);
    replayRecord.reset();
  };

  //去回放页面
  const goRecordPage = () => {
    history.push('/')
  };

  return (
    <div className='replay-page'>
      <header className='font-size-32 text-center pt-24 mb-24'>web record replay</header>
      {showClose ? (
        <div className='close-current-replay flex-center' onClick={handleCloseCurrentReplay}>
          close
        </div>
      ) : null}
      <div className='flex-center'>
        <button className='theme-btn' onClick={goRecordPage}>
          Go Record
        </button>
      </div>
      <ul className='mt-24 flex-cl replay-cont'>
        {recordList.reverse().map((it) => (
          <li
            className='flex-center mb-24 replay-item'
            key={it.time}
            onClick={() => handleReplayRecord(it)}>
            {it.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Replay;

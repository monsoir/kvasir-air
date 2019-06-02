import React from 'react';
import './App.css';

import RoundedButton from './components/RoundedButton';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="background-image" />
      <div className="content">
        <div className="buttonContainer">
          <RoundedButton
            title="导出"
            handler={exportData}
          />
          <RoundedButton
            title="导入"
            handler={importData}
          />
        </div>
      </div>
    </div>
  );
}

const exportData = async () => {
  let blob = null;
  try {
    const response = await fetch('/test', {
      method: 'get',
    });
    // console.log(response);
    blob = await response.blob();
  } catch {
    alert('出错了，请确保在设备上开启了服务');
    return;
  }

  // 浏览器端控制下载

  // 构建文件流
  // 创建 a 标签，利用属性 download
  const url = window.URL.createObjectURL(new Blob([blob as Blob]));
  const linkEle = document.createElement('a');
  linkEle.href = url;
  linkEle.setAttribute('download', 'backup.json');

  // 模拟 a 标签被点击
  document.body.appendChild(linkEle);
  linkEle.click();
  linkEle.parentNode!.removeChild(linkEle);
}

const importData = () => {}

export default App;

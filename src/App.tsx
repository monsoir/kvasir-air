import React from 'react';
import './App.css';

import RoundedButton from './components/RoundedButton';

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/';
let selectedFile: File;

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
    const response = await fetch(`${host}export`, {
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
  linkEle.setAttribute('download', 'backup.zip');

  // 模拟 a 标签被点击
  document.body.appendChild(linkEle);
  linkEle.click();
  linkEle.parentNode!.removeChild(linkEle);
}

const importData = () => {
  const fileSelector = createFileSelector();
  fileSelector.click();
}

const doImport = async () => {
  let response = null;
  try {
    response = await fetch(`${host}import`, {
      method: 'post',
      body: selectedFile,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    response = await response.json()
  } catch {
    alert('出错了，请确保在设备上开启了服务');
    return;
  }

  console.log(response);
}

const createFileSelector = () => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('accept', '.zip');
  fileSelector.onchange = fileDidSelect;
  return fileSelector;
}

const fileDidSelect = (e: Event) => {
  if (e.target) {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
      selectedFile = target.files[0];
      console.log(target.files);
      doImport();
    }
  }
}

export default App;

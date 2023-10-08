// E:\programming\Project\TexifyMe\texifyme-frontend\src\components\UploadForm.js

import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [latex, setLatex] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3000/upload/convert', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setLatex(data.latex);
      setMessage('画像の変換に成功しました！');
    } catch (error) {
      console.error("Error uploading image", error);
      setMessage('画像の変換に失敗しました。再度お試しください。');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const fileBlob = new Blob([latex], {type: 'text/plain'});
    element.href = URL.createObjectURL(fileBlob);
    element.download = 'converted.tex';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {latex && <p>Converted LaTeX: {latex}</p>}
      {latex && <button onClick={handleDownload}>Download LaTeX</button>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;

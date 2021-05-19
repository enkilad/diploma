import React, { useEffect, useState } from 'react';
// import { loadData, ProcessedData } from '../loadData';

export const TableContainer = () => {
  const [files, setFiles] = useState<any>();
  // const [tableRows, setTableRows] = useState<ProcessedData[]>([]);

  useEffect(() => {
    const load = async () => {
      // make request after files are uploaded to backend
      // const data = await loadData();
      // setTableRows(data);
    };

    load();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;
    console.log(`fileArr`, fileArr);

    if (!fileArr) return;

    const formData = new FormData();

    for (let i = 0; i < fileArr.length; i++) {
      console.log(`i`, i);
      formData.append(`multiple-files`, fileArr[i]);
    }

    console.log(`formData`, [...formData]);

    setFiles(formData);
  };

  const sendReq = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    await fetch('http://localhost:8000/api/multiple-upload', {
      method: 'POST',
      body: files,
    }).then((result) => console.log(`result`, result));
  };

  // if (!tableRows) return <div>Error!</div>;

  return (
    <>
      <form>
        <label htmlFor="multiple-files">Файлы</label>
        <input
          id="multiple-files"
          name="multiple-files"
          type="file"
          multiple
          accept=".txt, .doc, .docx, .xlsx, .ppt, .pptx, .pdf"
          onChange={(e) => handleInputChange(e)}
        />
        <button
          type="button"
          onClick={(e) => sendReq(e)}
          // disabled={files?.length < 1}
        >
          Send
        </button>
      </form>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {tableRows?.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.classification}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </>
  );
};

import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

interface Props {
  files: FormData;
  setFiles: (files: any) => void;
  setTableRows: (rows: any) => void;
}

export const FormContainer: React.FC<Props> = ({
  files,
  setFiles,
  setTableRows,
}) => {
  console.log(`files`, files);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;
    console.log(`fileArr`, fileArr);

    if (!fileArr) return;

    const formData = new FormData();

    for (let i = 0; i < fileArr.length; i++) {
      formData.append(`multiple-files`, fileArr[i]);
    }

    console.log(`formData`, [...formData]);

    setFiles(formData);
  };

  const sendReq = async () => {
    await fetch('http://localhost:8000/api/multiple-upload', {
      method: 'POST',
      body: files,
    }).then((result) =>
      console.log(
        `result`,
        result.json().then((data) => setTableRows(data.data))
      )
    );
  };

  return (
    <Form
      style={{
        border: '1px solid rgba(34,36,38,.15)',
        borderRadius: 5,
        padding: 20,
      }}
    >
      <Form.Field>
        <label htmlFor="multiple-files">Выберите файлы</label>
        <Form.Input
          id="multiple-files"
          name="multiple-files"
          type="file"
          multiple
          accept=".txt, .doc, .docx, .xlsx, .ppt, .pptx, .pdf"
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Field>
      <Form.Button type="button" onClick={sendReq} disabled={!files}>
        Send
      </Form.Button>
    </Form>
  );
};

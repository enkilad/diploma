import React from 'react';
import { Form } from 'semantic-ui-react';

interface Props {
  files: FormData;
  setFiles: (files: any) => void;
  setTableRows: (rows: any) => void;
  areFilesUploading: boolean;
  setAreFilesUploading: (b: boolean) => void;
}

export const FormContainer: React.FC<Props> = ({
  files,
  setFiles,
  setTableRows,
  areFilesUploading,
  setAreFilesUploading,
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

  const sendRequest = async () => {
    setTableRows([]);
    setAreFilesUploading(true);
    try {
      await fetch('http://localhost:8000/api/multiple-upload', {
        method: 'POST',
        body: files,
      }).then((result) =>
        console.log(
          `result`,
          result.json().then((data) => setTableRows(data))
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setAreFilesUploading(false);
    }
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
      <Form.Button
        type="button"
        onClick={sendRequest}
        disabled={!files || areFilesUploading}
        loading={areFilesUploading}
      >
        Send
      </Form.Button>
    </Form>
  );
};

import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { FormContainer } from './components/FormContainer';
import { TableContainer } from './components/TableContainer';
import { IFileParsed } from './interfaces';

export const App = () => {
  const [files, setFiles] = useState<FormData | any>();
  const [tableRows, setTableRows] = useState<IFileParsed[]>([]);
  const [areFilesUploading, setAreFilesUploading] = useState<boolean>(false);

  return (
    <Container>
      <FormContainer
        files={files}
        setFiles={setFiles}
        setTableRows={setTableRows}
        areFilesUploading={areFilesUploading}
        setAreFilesUploading={setAreFilesUploading}
      />
      <TableContainer
        tableRows={tableRows}
        setTableRows={setTableRows}
        areFilesUploading={areFilesUploading}
      />
    </Container>
  );
};

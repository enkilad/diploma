import React, { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Select from 'react-select';
import fileSaver from 'file-saver';
import { IFileParsed } from '../interfaces';
import { MyLoader } from './MyLoader';

interface Props {
  tableRows: IFileParsed[];
  setTableRows: React.Dispatch<React.SetStateAction<IFileParsed[]>>;
  areFilesUploading: boolean;
}

const options = [
  { value: '1 - Специальные ПДн', label: '1 - Специальные ПДн' },
  { value: '2 - Биометрические ПДн', label: '2 - Биометрические ПДн' },
  { value: '3 - Общедоступные ПДн', label: '3 - Общедоступные ПДн' },
  { value: '4 - Иные ПДн', label: '4 - Иные ПДн' },
];

export const TableContainer: React.FC<Props> = ({
  tableRows,
  setTableRows,
  areFilesUploading,
}) => {
  const [classification, setClassification] = useState<Record<string, string>>(
    {}
  );
  console.log(`classification`, classification);
  const [isChangingClassification, setIsChangingClassification] =
    useState<boolean>(false);

  const download = (row: IFileParsed) => {
    const myArr = new Uint8Array(row.file.data);
    const blob = new Blob([myArr], { type: 'octet/stream' });
    fileSaver.saveAs(blob, row.name);
  };

  const handleClassificationChange = (e: any, row: IFileParsed) => {
    setClassification((state) => ({ ...state, [row._id]: e.value }));
  };

  const sendClassification = async (row: IFileParsed) => {
    console.log(`row`, row);
    setIsChangingClassification(true);
    try {
      await fetch('http://localhost:8000/api/classification', {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({
          id: row._id,
          classification: classification[row._id],
        }),
      }).then((result) => {
        console.log(
          'result',
          result.json().then((data) => {
            setTableRows((prevState: IFileParsed[]) => {
              // no mutation, create new clean arr
              const newArr = [...prevState];
              // find index of obj with empty classification
              const prevObjIndex = newArr.findIndex(
                (fileParsed) => String(fileParsed._id) === String(data._id)
              );
              // replace it with filled one
              newArr[prevObjIndex] = data;
              // update the state with new array
              return [...newArr];
            });
          })
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsChangingClassification(false);
    }
  };

  if (areFilesUploading) {
    return <MyLoader />;
  }

  if (!tableRows.length) {
    return (
      <p style={{ padding: '11px 13px' }}>
        Загрузите файлы и дождитесь окончания их обработки, чтобы увидеть
        классификации
      </p>
    );
  }

  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>File</Table.HeaderCell>
          <Table.HeaderCell>Classification</Table.HeaderCell>
          <Table.HeaderCell>Extension</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableRows?.map((row: IFileParsed) => (
          <Table.Row key={row._id}>
            <Table.Cell
              selectable
              onClick={() => download(row)}
              style={{
                padding: '0 11px',
                color: '#0000FF',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {row.name}
            </Table.Cell>
            <Table.Cell style={{ display: 'flex' }}>
              <div style={{ width: '100%', marginRight: '10px' }}>
                <Select
                  options={options}
                  disabled={!!row.classification}
                  value={options.find((o) => o.value === row.classification)}
                  defaultValue={options.find(
                    (o) => o.value === row.classification
                  )}
                  onChange={(e) =>
                    !row.classification && handleClassificationChange(e, row)
                  }
                />
              </div>
              <Button
                loading={isChangingClassification}
                disabled={!!row.classification || isChangingClassification}
                onClick={() => sendClassification(row)}
              >
                Изменить
              </Button>
            </Table.Cell>
            <Table.Cell>{row.extension}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

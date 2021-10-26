import React, { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Select from 'react-select';
import { IFileParsed } from '../interfaces';
import fileSaver from 'file-saver';

interface Props {
  tableRows: IFileParsed[];
  setTableRows: (rows: IFileParsed[]) => void;
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
}) => {
  const [classification, setClassification] = useState<Record<string, string>>(
    {}
  );
  console.log(`classification`, classification)
  const [disabled, setDisabled] = useState(false);

  const download = (row: IFileParsed) => {
    const myArr = new Uint8Array(row.file.data);
    const blob = new Blob([myArr], { type: 'octet/stream' });
    fileSaver.saveAs(blob, row.name);
  };

  const handleClassificationChange = (e: any, row: IFileParsed) => {
    setClassification((state) => ({ ...state, [row._id]: e.value }));
  };

  const sendClassification = async (row: IFileParsed) => {
    console.log(`row`, row)
    // setDisabled(true);
    await fetch('http://localhost:8000/api/classification', {
      method: 'PUT',
      body: JSON.stringify({
        id: row._id,
        classification: classification[row._id],
      }),
    }).then((result) =>
      console.log(
        `result`,
        result.json().then((data) => setTableRows(data))
      )
    );
  };

  if (!tableRows.length)
    return (
      <p style={{ marginTop: '14px' }}>
        Загрузите файлы, дождитесь окончания их обработки, чтобы увидеть
        классификации файлов
      </p>
    );

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
                disabled={!!row.classification || disabled}
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

import React, { useState, useRef } from 'react';
import classes from './Checkboxes.module.css';
import { Button } from '@mantine/core';


type DataType = {
  text: string;
  checkboxes: boolean[];
};

export function Checkboxes() {
  const [data, setData] = useState<DataType[]>([
    { text: 'Matemática Discreta', checkboxes: [false] },
    { text: 'Sistemas Digitales', checkboxes: [false] },
    { text: 'Probabilidades', checkboxes: [false] },
    { text: 'Algorítmica II', checkboxes: [false] },
    { text: 'Contabilidad para la gestión', checkboxes: [false] },
  ]);

    const headers = ['Semestre 1', 'Semestre 2', 'Semestre 3']; // Define the list of headers
    const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);

const handleLeftClick = () => {
  setCurrentHeaderIndex(prevIndex => (prevIndex - 1 + headers.length) % headers.length);
};

const handleRightClick = () => {
  setCurrentHeaderIndex(prevIndex => (prevIndex + 1) % headers.length);
};

  const [columns, setColumns] = useState(1);

  const handleCheckboxChange = (rowIndex: number, columnIndex: number) => {
    setData(prevData =>
      prevData.map((row, i) =>
        i === rowIndex ? { ...row, checkboxes: row.checkboxes.map((checkbox, j) => j === columnIndex ? !checkbox : checkbox) } : row
      )
    );
  };

  const handleMasterCheckboxChange = (columnIndex: number, checked: boolean) => {
    setData(prevData =>
      prevData.map(row => ({
        ...row,
        checkboxes: row.checkboxes.map((checkbox, j) =>
          j === columnIndex ? checked : checkbox
        ),
      }))
    );
  };

  const addColumn = () => {
    setData(prevData =>
      prevData.map(row => ({ ...row, checkboxes: [...row.checkboxes, false] }))
    );
    setColumns(prevColumns => prevColumns + 1);
  };

  return (
    <main className={classes.main}>
    <h1>Añade las secciones</h1>
      <table className={classes.columns} style={{ minWidth: 350 * columns**(0.5) }}>
        <thead>
          <tr style={{textAlign: "left"}}>
            <th >Curso</th>
            {Array.from({ length: columns }, (_, i) => (
              <th style={{textAlign: "right"}} key={i} >
                {` G${i + 1}`} 
              </th>
            ))}
          </tr>
        </thead>
        <p>


        </p>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.text}</td>
              {row.checkboxes.map((checkbox, columnIndex) => (
                <td style={{
                    justifyContent: "right",
                    alignContent: "right",
                    textAlign: "right",
                }} key={columnIndex}>
                  <input
                    type="checkbox"
                    checked={checkbox}
                    
                    onChange={() => handleCheckboxChange(rowIndex, columnIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <p>

            
        </p>
        <tfoot>
            <tr>
                <td>
                    Todo
                </td>
                {[...Array(columns)].map((_, columnIndex) => (
                <td style={{
                    justifyContent: "right",
                    alignContent: "right",
                    textAlign: "right",
                }} key={columnIndex}>
                    <input
                    type="checkbox"
                    checked={data.every(row => row.checkboxes[columnIndex])}
                    onChange={e => handleMasterCheckboxChange(columnIndex, e.target.checked)}
                    />
                </td>
                ))}
            </tr>
        </tfoot>
      </table>
      <Button onClick={addColumn}>Añadir sección</Button>
    </main>
  );
}
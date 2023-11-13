import styles from './GroupsSelector.module.scss';
import { useState, useEffect } from 'react';
import { Button, Loader } from '@mantine/core';
import { removeLastWord, repeat } from '../../utils';
import CourseDisplayItem from './CourseDisplayItem';
import { useGroupSelections } from '../../stores/groupsSelection';

// This type comes from the API, but it's not complete.
// I just added the fields I needed (see the console.log(data))
type CourseAPIResponse = {
  cur_vcNombre: string,
  cur_vcCodigo: string,
  plan_estudios: {
    plaest_vcCodigo: string,
  },
  curso_tipo: {
    curtip_vcNombre: "ELECTIVO" | "OBLIGATORIO",
  },
};

function GroupsSelector() {
  const [coursesData, setCoursesData] = useState<CourseAPIResponse[]>([]);
  const { nGroups, selections, toggleSelection, toggleEntireColumn, addNewGroup } = useGroupSelections();

  console.log({nGroups, selections})

  // const headers = ['Semestre 1', 'Semestre 2', 'Semestre 3'];
  // const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);

  // Gather courses data from API.
  // The API doesn't return any 'checkbox states', so we add it.
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cursos/epis/2023-II`)
      .then(response => response.json())
      .then((data: CourseAPIResponse[]) => {
        console.log(data);
        setCoursesData(data);
        if (Object.values(selections).length === 0) {
          useGroupSelections.setState({
            nGroups: 1,
            selections: {
              ...data.reduce((acc, course) => ({
                ...acc,
                [course.cur_vcCodigo]: [false],
              }), {}),
            },
          });
        }
      });
  }, []);


  return (
    <main className={styles.main}>
      <h1>Añade las secciones</h1>
      <Button onClick={addNewGroup}>Añadir sección</Button>
      <table className={styles.table}>
        <thead>
          <tr style={{textAlign: "left"}}>
            <th >Curso</th>
            {
              repeat(nGroups, (i) => (
                <th style={{textAlign: "right"}} key={i} >
                  {` G${i + 1}`}
                </th>
              ))
            }
          </tr>
        </thead>
        {
          coursesData.length > 0 ? <>
            <tbody>
            {coursesData.map((course, rowIndex) => (
              <tr key={rowIndex}>
                <CourseDisplayItem
                  courseName={removeLastWord(course.cur_vcNombre)}
                  courseCode={course.cur_vcCodigo}
                  studyPlan={course.plan_estudios.plaest_vcCodigo}
                  cursoTipo={course.curso_tipo.curtip_vcNombre}
                />
                {
                  selections[course.cur_vcCodigo].map((checked, i) => (
                    <td style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                    }} key={i}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelection(
                          course.cur_vcCodigo,
                          i
                        )}
                      />
                    </td>
                  ))
                }
              </tr>
            ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        Seleccionar todo
                    </td>
                    {repeat(nGroups, (columnIndex) => (
                      <td key={columnIndex}>
                        <input
                          type="checkbox"
                          checked={
                            Object.values(selections).every(
                              (selection) => selection[columnIndex]
                            )
                          }
                          onChange={(e) => {
                            toggleEntireColumn(columnIndex, e.target.checked);
                          }}
                        />
                      </td>
                    ))}
                </tr>
            </tfoot>
          </> : <Loader className={styles.loader} color="blue" size="lg" />
        }
      </table>
    </main>
  );
}

export default GroupsSelector;

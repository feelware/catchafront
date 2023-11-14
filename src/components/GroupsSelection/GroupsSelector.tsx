import { useState, useEffect } from 'react';
import { Button, Loader, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ToastContainer, toast } from 'react-toastify';
import styles from './GroupsSelector.module.scss';
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
    curtip_vcNombre: 'ELECTIVO' | 'OBLIGATORIO',
  },
};

function GroupsSelector() {
  const [coursesData, setCoursesData] = useState<CourseAPIResponse[]>([]);
  const { nGroups, selections, toggleSelection, toggleEntireColumn, addNewGroup } = useGroupSelections();
  const [opened, { open, close }] = useDisclosure(false);

  // Gather courses data from API.
  // The API doesn't return any 'checkbox states', so we add it.
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cursos/epis`)
      .then(response => response.json())
      .then((data: CourseAPIResponse[]) => {
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

  async function handleConfirmSelections() {
    const payload = coursesData.map(course => ({
        curso_codigo: course.cur_vcCodigo,
        grupos: selections[course.cur_vcCodigo],
    }));

    const data = {
        plan: 'epis-2018',
        payload,
    };

    const response = await fetch('http://localhost:8000/cursos/epis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

  return (
    <main className={styles.main}>
      <ToastContainer />
      <Modal opened={opened} onClose={close} title="Confirmar?">
        <Button onClick={handleConfirmSelections}>
          Confimar?
        </Button>
      </Modal>
      <section className={styles.tableWrapper}>
        <Button className={styles.addGroupBtn} onClick={addNewGroup}>
          Añadir sección
        </Button>
        <table className={styles.table}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th>Curso</th>
              {
                repeat(nGroups, (i) => (
                  <th style={{ textAlign: 'right' }} key={i}>
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
                      <td key={i}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSelection(course.cur_vcCodigo, i)}
                        />
                      </td>
                    ))
                  }
                </tr>
              ))}
              </tbody>
              <tfoot>
                <tr>
                    <td>Seleccionar todo</td>
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
        <Button
          className={styles.confirmButton}
          onClick={open}
        >
          Confirmar
        </Button>
      </section>
    </main>
  );
}

export default GroupsSelector;

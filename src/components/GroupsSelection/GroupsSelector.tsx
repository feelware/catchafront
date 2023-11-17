import { useState, useEffect } from 'react';
import { Button, Group, Loader, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ToastContainer } from 'react-toastify';
import { removeLastWord, repeat } from '../../utils';
import { useGroupSelections } from '../../stores/groupsSelection';
import { CourseAPIResponse } from './types';
import CourseDisplayItem from './CourseDisplayItem';
import styles from './GroupsSelector.module.scss';

function GroupsSelector() {
  const [coursesData, setCoursesData] = useState<CourseAPIResponse[]>([]);
  const {
    nGroups,
    selections,
    toggleSelection,
    toggleEntireColumn,
    updateWithFetchedCourses,
    addNewGroup,
  } = useGroupSelections();
  const [opened, { open, close }] = useDisclosure(false);

  // Gather courses data from API.
  // The API doesn't return any 'checkbox states', so we add it.
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cursos/epis`)
      .then(response => response.json())
      .then((data: CourseAPIResponse[]) => {
        setCoursesData(data);
        updateWithFetchedCourses(data);
      });
  }, []);

  async function handleConfirmSelections() {
    const payload = coursesData.map(course => ({
      curso_id: course.cur_iCodigo,
      curso_codigo: course.cur_vcCodigo,
      grupos: selections[course.cur_vcCodigo],
    }));

    const data = {
        plan: 'epis-2018',
        cursos: payload,
    };

    const response = await fetch(`http://localhost:8000/secciones/epis/${'2023-II'}`, {
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
    close();
    return result;
  }

  return (
    <main className={styles.main}>
      <ToastContainer />
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmar la creación de los grupos"
        centered
      >
        <Group>
          <Text>
            Está apunto de crear las secciones para el semestre
          </Text>
        </Group>
        <Group mt="md">
          <Button onClick={handleConfirmSelections}>Confimar</Button>
        </Group>
      </Modal>
      <section className={styles.tableWrapper}>
        <Button
          className={styles.addGroupBtn}
          onClick={addNewGroup}
          size="compact-sm"
        >
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
            coursesData.length > 0 ?
            <>
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
            </> :
            <Loader className={styles.loader} color="blue" size="lg" />
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

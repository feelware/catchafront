import { Button, Input, Loader, Modal, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { toast } from 'react-toastify';
import styles from './SemestersList.module.scss';
import SemseterItem from './SemesterItem';

export interface SemestreInformation {
  sem_vcCodigo: string;
  sem_cEstado: 'I' | 'A' | 'P';
}

function SemestersList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [semesters, setSemesters] = useState<SemestreInformation[] | null>(null);
  const semesterForms = useForm({
    initialValues: {
      timeRange: [],
      semesterName: '',
    },
  });

  const searchIcon = <IconSearch
    style={{ width: rem(16), height: rem(16) }}
    stroke={1.5}
  />;

  const handleSemesterCreation = () => {
    const request = fetch(`${import.meta.env.VITE_API_URL}/semestre`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        codigo: semesterForms.values.semesterName,
      }),
    })
      .then(response => response.json())
      .then((data) => data);

    toast.promise(request, {

    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/semestre`)
      .then(response => response.json())
      .then(setSemesters);
  }, []);

  return (
    <>
      <header className={styles.semestersPageHeader}>
        <h1>Todos los semestres</h1>
        <Input
          className={styles.semestersSearch}
          placeholder="Buscar semestre"
          leftSection={searchIcon}
        />
      </header>
      <section className={styles.semesterList}>
        <Modal
          opened={opened}
          onClose={close}
          title="Crear un nuevo semestre"
          centered
        >
          <Input.Wrapper label="Nombre del semestre" withAsterisk>
            <Input
              placeholder="e.g. 2022-II, 2023-I"
              required
              {...semesterForms.getInputProps('semesterName')}
            />
          </Input.Wrapper>
          {/* <Select
            label="Escuela profesional"
            placeholder=""
            data={['Ingeniería de Sistemas (epis)', 'Ingeniería de Software (episw)']}
            defaultValue="React"
            allowDeselect={false}
          /> */}
          <DatePickerInput
            // clearable
            type="range"
            label="Periodo del semestre"
            required
            placeholder="Inicio del semestre"
            {...semesterForms.getInputProps('timeRange')}
          />
          <Button
            size="compact-sm"
            disabled={semesterForms.values.semesterName === '' || semesterForms.values.timeRange.length === 0}
            onClick={handleSemesterCreation}
          >
            Crear semestre
          </Button>
        </Modal>
        <header className={styles.semestersListHeader}>
          <h3>FISI | E.P. Ingeniería de Sistemas</h3>
          <Button
            onClick={open}
            size="compact-sm"
          >
            Añadir semestre
          </Button>
        </header>
        <section className={styles.semesterListContainer}>
          {
            semesters === null
              ? <Loader />
              : semesters.map(semester => (
                <SemseterItem key={semester.sem_vcCodigo} semester={semester} />
              ))
          }
        </section>
      </section>
    </>
  );
}

export default SemestersList;

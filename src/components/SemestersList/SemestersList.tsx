import { Button, Input, Modal, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useForm } from '@mantine/form';
import styles from './SemestersList.module.scss';

export interface SemestreInformation {
  sem_vcCodigo: string;
  sem_cEstado: string;
}

function SemestersList() {
  const [opened, { open, close }] = useDisclosure(false);
  const escuelaSeleccionada = useRef('');
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
    fetch(`${import.meta.env.VITE_API_URL}/semestre`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        codigo: semesterForms.values.semesterName,
      }),
    })
      .then(response => response.json())
      .then(console.log);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/semestre`)
      .then(response => response.json())
      .then(semestres => {
        console.log({ semestres });
      });
  }, []);

  return (
    <section>
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
          size="compact-md"
          disabled={semesterForms.values.semesterName === '' || semesterForms.values.timeRange.length === 0}
          onClick={handleSemesterCreation}
        >
          Crear semestre
        </Button>
      </Modal>

      <section>
        <Input
          placeholder="Nombre del semestre"
          leftSection={searchIcon}
        />
        <Button onClick={open}>Añadir semestre</Button>
      </section>
      <h3>FISI | E.P. Ingeniería de Sistemas</h3>
      <section>
        {

        }
      </section>
    </section>
  );
}

export default SemestersList;

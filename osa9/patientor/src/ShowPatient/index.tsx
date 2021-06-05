import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, setPatient } from '../state';

const ShowPatient = () => {
  const [{ patient }, dispatch] = useStateValue();
  const id = useParams<{id: string}>().id;
  useEffect(() => {
    if (patient && patient.id === id) return;

    const getPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (error) {
        console.error(error);
      }
    };
    void getPatient();
  }, []);

  const renderPatient = () => {
    if (patient) {
      return (
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Born</Table.Cell>
              <Table.Cell>{patient.dateOfBirth}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Gender</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Occupation</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>SSN</Table.Cell>
              <Table.Cell>{patient.ssn}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>id</Table.Cell>
              <Table.Cell>{patient.id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Health rating</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }
  };

  return (
    <div>
      {patient
        ? <Container><h1>{patient.name}</h1></Container> 
        : null
      }
      {renderPatient()}
    </div>
  );
};

export default ShowPatient;
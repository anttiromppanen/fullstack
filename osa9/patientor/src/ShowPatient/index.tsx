import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, setPatient } from '../state';
//import { Entry } from '../types';
//
//import HospitalEntry from '../components/HospitalEntry';
//import OccupationalHealthCareEntry from '../components/OccupationalHealthCareEntry';

const ShowPatient = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnoses },] = useStateValue();
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

  //const assertNever = (value: never): never => {
  //  throw new Error(
  //    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  //  );
  //};

  //const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  //  switch (entry.type) {
  //    case 'Hospital':
  //      return <HospitalEntry />;
  //    case 'OccupationalHealthcare':
  //      return <OccupationalHealthCareEntry />;
  //    case 'HealthCheck':
  //      return <div>asdf</div>;
  //    default:
  //      return assertNever(entry);
  //  }
  //};
  
  const patientEntriesMapped = () => patient?.entries.map(x => {
    return <div key={x.id}>
      <p>{x.date} {x.description}</p>
      <ul>
        {x.diagnosisCodes?.map(x => {
          return <li key={x}>{x} {diagnoses[x].name}</li>;
        })}
      </ul>
    </div>;
  }
  );
  const renderPatient = () => {
    if (patient) {
      return (
        <div>
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
            </Table.Body>
          </Table>
          <div>
            <h3>entries</h3>
            {patientEntriesMapped()}
          </div>
        </div>
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
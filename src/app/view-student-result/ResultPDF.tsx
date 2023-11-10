import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import profile from '../../assets/profile_placeholder.png';
import { type } from 'os';
import { SubjectScoreType } from '@/lib/types/types';

type ResultProp1 = {
  student: {
    firstName: string;
    lastName: string;
    profilePhotoUrl: string;
    studentId: string;
    gender: string;
    currentClass: string;
    age: number;
  } | null;
  result: SubjectScoreType[];
  setTotal: () => number;
}
const ResultPDF = ({ student, result, setTotal}: ResultProp1) => {
 

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      width: '100%',
      border: '1px solid #000',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
    },
    tableRow: {
      border: '1px solid #000',
    },
    tableCell: {
      padding: 8,
      textAlign: 'center',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
  });
  
 
 
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.imageContainer}>
          {/* <Image
            src={student?.profilePhotoUrl || profile}
            style={styles.image}
            // alt="Student's Image"
          /> */}
        </View>
        <View style={styles.section}>
          <Text>Student Information</Text>
          <table 
          // style={styles.table}
          >
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Name:</td>
                <td style={styles.tableCell}>{`${student?.firstName} ${student?.lastName}`}</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Current Class:</td>
                <td style={styles.tableCell}>{student?.currentClass}</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Gender:</td>
                <td style={styles.tableCell}>{student?.gender}</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Age:</td>
                <td style={styles.tableCell}>{student?.age}</td>
              </tr>
            </tbody>
          </table>
        </View>
        <Text>Student Examination Result</Text>
        {result.length > 0 ? (
          <table 
          // style={styles.table}
          >
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Subject</th>
                <th style={styles.tableCell}>Grade</th>
                <th style={styles.tableCell}>Remark</th>
              </tr>
            </thead>
            <tbody>
              {result.map((subjectScore, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{Object.keys(subjectScore)[0]}</td>
                  <td style={styles.tableCell}>
                    {subjectScore[Object.keys(subjectScore)[0]]}
                  </td>
                  <td style={styles.tableCell}>
                    {(parseFloat(subjectScore[Object.keys(subjectScore)[0]]) / setTotal()) * 100 >= 50
                      ? 'Pass'
                      : 'Needs Help'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Text>No result available yet. Please check back later</Text>
        )}
      </View>
    </Page>
  </Document>
  );
};

export default ResultPDF;

import './App.css';
import { useEffect, useState } from 'react';
import QuestWithAnswer from './components/QuestWithAnswer';
import { Grid, Button, Typography } from '@mui/material'

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'

  // console.log(API_URL)

  useEffect(() => {
    fetch(API_URL).then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setQuestions(data.results);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, [API_URL])


  const nextHandler = () => {
    setCurrentIndex((prev) => prev + 1)
  }


  const qas = questions[currentIndex];
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ 'height': '100vh' }}>
        <Grid item lg={6} md={6} xs={4}>
          <Typography variant='h6' sx={{ m: 2 }}>{questions ?? questions.length > 0 ? `No of Questions ${questions.length}` : ''}</Typography>
          <Grid container>{questions.length > 0 ? <QuestWithAnswer qas={qas} qno={currentIndex}></QuestWithAnswer> : <Typography>Try to refresh the page !!</Typography>}</Grid>
          <Grid container direction='column' alignItems='center' justifyContent='center'>
            <Button variant="contained" onClick={nextHandler} disabled={currentIndex === 9}>Next</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

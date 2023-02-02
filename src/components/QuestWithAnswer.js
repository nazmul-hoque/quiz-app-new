import React, { useEffect, useState } from 'react'
import { Answer } from './Answer';
import { Grid, Box, Typography } from '@mui/material'

const QuestWithAnswer = ({ qas, qno }) => {
    console.log(qno);



    const [disabled, setDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    // const renderHTML = (rawHTML) => React.createElement("<div>", { dangerouslySetInnerHTML: { __html: rawHTML } });

    const clickHandler = (e) => {
        const yourAnswer = e.target.getAttribute("data-ans");
        // const corrAnswer = e.target.attributes.getNamedItem("data-coans").value;
        const corrAnswer = e.target.getAttribute("data-coans");
        console.log(yourAnswer);
        if (yourAnswer === corrAnswer) {
            e.target.setAttribute('color', 'success')
            setScore((prev) => prev + 1)
        } else {
            e.target.setAttribute('color', 'error')
        }
        setDisabled(true);
    }

    useEffect(() => {
        setShuffledAnswers([...qas.incorrect_answers, qas.correct_answer].sort(() => Math.random() - 0.5))
        setDisabled(false);
        //setQuestionNo((prev) => prev + 1)
    }, [qas])

    //const shuffledAnswers = [...qas.incorrect_answers, qas.correct_answer].sort(() => Math.random() - 0.5);
    return qas ?
        (
            <Grid>
                <Box sx={{ m: 2 }}><Typography variant='h5'>{`Q${qno+1}. ${qas.question}`}</Typography></Box>
                <Grid container direction='column' justifyContent='space-evenly'  >
                    {shuffledAnswers && shuffledAnswers.map((ans, idx) => {
                        return <Answer idx={idx} answer={ans} canswer={qas.correct_answer} disabled={disabled} clickHandler={clickHandler} />
                    })
                    }
                </Grid>
                {disabled ? (<Box sx={{ m: 2 }}>Correct answer is {qas.correct_answer}</Box>) : (<br />)}
                <Box sx={{ m: 2 }}>Your total score is {score}/10</Box>
            </Grid>
        ) : (
            <>
                <Box sx={{ m: 2 }}>NO questions found!!</Box>
            </>
        )
}


export default QuestWithAnswer

    // < div >
    // { shuffledAnswers && shuffledAnswers.map((ans, idx) => {
    //     return <button key={idx} className={ans === qas.correct_answer ? 'correct' : 'incorrect'}>
    //         {ans}
    //     </button>
    // })}
    //         </div >

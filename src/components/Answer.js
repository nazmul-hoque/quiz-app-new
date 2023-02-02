import React from 'react'
import { Button } from '@mui/material'

export const Answer = ({ answer,idx, canswer, clickHandler, disabled}) => {
    return (
        <Button sx={{m:1}}   key={idx} variant='outlined' data-ans={answer} data-coans={canswer} disabled={disabled}  onClick={clickHandler}>
            {answer}
        </Button>
    )
}

import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { useCallback, useEffect, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { RootState } from '../store'
import { IQuestion, IQuestionsRequest } from '../services/questions'
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector'
import { getQuestionsAsync } from '../store/questions'

export default function Questions() {
  const isGetData = useRef(false)
  const dispatch = useAppDispatch()
  const [keyword] = useState('')
  const [loadingDisplay, setLoadingDisplay] = useState('block')
  const questions: Array<IQuestion> = useTypedSelector((state: RootState) => state.questions.list)

  const fetchData = useCallback(async () => {
    setLoadingDisplay('block')
    const params: IQuestionsRequest = { tagged: keyword }
    await dispatch(getQuestionsAsync(params))
    setLoadingDisplay('none')
  }, [dispatch, keyword])

  useEffect(() => {
    if (isGetData.current) return
    isGetData.current = true
    fetchData()
  }, [fetchData])

  return (
    <Box sx={{ width: '100%' }}>
      {questions &&
        questions.map((question: IQuestion) => (
          <List
            sx={{
              display: 'flex',
              width: '100%',
              borderBottomColor: 'gray',
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
            }}
            key={question.question_id}
          >
            <ListItem sx={{ width: '80%' }}>
              <ListItemText
                primary={question.title}
                secondary={
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'red',
                      }}
                    >
                      <Typography>Score</Typography>
                      <Typography>{question.score}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'red',
                      }}
                    >
                      <Typography>Answers</Typography>
                      <Typography>{question.answer_count}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'red',
                      }}
                    >
                      <Typography>Viewed</Typography>
                      <Typography>{question.view_count}</Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            <ListItemAvatar
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
              }}
            >
              <Avatar alt={question.owner.display_name} src={question.owner.profile_image} />
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {question.owner.display_name}
              </Typography>
            </ListItemAvatar>
          </List>
        ))}
      <CircularProgress color="inherit" sx={{ display: loadingDisplay }} />
    </Box>
  )
}

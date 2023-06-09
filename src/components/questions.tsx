import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@mui/material/CircularProgress'
import { IQuestion, IQuestionsRequest } from '../services/questions'
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector'
import { getQuestionsAsync } from '../store/questions'
import { RootState } from '../store'

interface Props {
  keyword: string
}

export default function Questions({ keyword }: Props) {
  const dispatch = useAppDispatch()
  const questions: Array<IQuestion> = useTypedSelector((state: RootState) => state.questions.list)
  const page: number = useTypedSelector((state: RootState) => state.questions.page)

  const fetchQuestionsData = useCallback(async () => {
    const params: IQuestionsRequest = { tagged: keyword, page }
    await dispatch(getQuestionsAsync(params))
  }, [page, dispatch, keyword])

  return (
    <div id="scrollableDiv" style={{ width: '100%', overflowY: 'auto' }}>
      <InfiniteScroll
        dataLength={questions.length}
        next={() => {
          fetchQuestionsData()
        }}
        hasMore={page > 1}
        loader={<CircularProgress sx={{ margin: 5 }} />}
        scrollableTarget="scrollableDiv"
      >
        {questions &&
          questions.map((question: IQuestion) => (
            <List
              sx={{
                display: 'flex',
                width: '100%',
                borderBottomColor: 'gray',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                cursor: 'pointer',
              }}
              key={question.question_id}
              onClick={() => window.open(question.link)}
            >
              <ListItem sx={{ width: '80%', flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText primary={question.title} />
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
                    <Typography color={question.score < 0 ? 'red' : 'black'}>
                      {question.score}
                    </Typography>
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
                    <Typography
                      color={() => {
                        if (question.answer_count > 0)
                          if (question.is_answered) return 'white'
                          else return 'green'
                        return 'black'
                      }}
                      border={() => {
                        if (question.is_answered) return 'solid 1px green'
                        return ''
                      }}
                      bgcolor={() => {
                        if (question.is_answered) return 'green'
                        return ''
                      }}
                      width="100%"
                      textAlign="center"
                    >
                      {question.answer_count}
                    </Typography>
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
                    <Typography color="black">{question.view_count}</Typography>
                  </Box>
                </Box>
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
      </InfiniteScroll>
    </div>
  )
}

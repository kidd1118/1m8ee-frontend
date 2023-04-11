import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useCallback, useEffect, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { RootState } from '../store'
import { ITag, ITagsRequest, ITagsResponse } from '../services/tags'
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector'
import { getTagsAsync } from '../store/tags'
import Questions from '../components/questions'
import { IQuestionsRequest } from '../services/questions'
import { getQuestionsAsync, clear } from '../store/questions'

export default function Page() {
  const isGetData = useRef(false)
  const dispatch = useAppDispatch()
  const [tagKeyword, setTagKeyword] = useState('')
  const [selectedTagIndex, setSelectedTagIndex] = useState(0)
  const [isLoadTags, setIsLoadTags] = useState(true)
  const tags: Array<ITag> = useTypedSelector((state: RootState) => state.tags.list)

  const fetchQuestionsData = useCallback(
    async (questionKeyword: string = '') => {
      dispatch(clear())
      const params: IQuestionsRequest = { tagged: questionKeyword, page: 1 }
      await dispatch(getQuestionsAsync(params))
    },
    [dispatch]
  )

  const fetchTagsData = useCallback(async () => {
    setIsLoadTags(true)
    const params: ITagsRequest = { inname: tagKeyword }
    await dispatch(getTagsAsync(params)).then(({ payload }) => {
      const newTags = (payload as ITagsResponse).items
      fetchQuestionsData(newTags && newTags.length ? newTags[0].name : '')
    })
    setSelectedTagIndex(0)
    setIsLoadTags(false)
  }, [dispatch, fetchQuestionsData, tagKeyword])

  useEffect(() => {
    if (isGetData.current) return
    isGetData.current = true
    fetchTagsData()
  }, [fetchTagsData])

  return (
    <Box
      sx={{
        margin: '50px auto',
        maxWidth: '1024px',
        overflow: 'hidden',
        height: '90vh',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Input
          fullWidth
          placeholder="Tag"
          value={tagKeyword}
          onChange={(newValue) => setTagKeyword(newValue.target.value)}
        />
        <Button variant="contained" onClick={() => fetchTagsData()}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h6">Trending</Typography>
        <CircularProgress size={25} sx={{ display: isLoadTags ? 'block' : 'none' }} />
        <Box sx={{ display: isLoadTags ? 'none' : 'block' }}>
          {tags &&
            tags.map((tag: ITag, index) => (
              <Chip
                sx={{ margin: '5px' }}
                label={tag.name}
                component="a"
                clickable
                key={tag.name}
                variant={selectedTagIndex === index ? 'filled' : 'outlined'}
                onClick={() => {
                  setSelectedTagIndex(index)
                  fetchQuestionsData(tag.name)
                }}
              />
            ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Questions keyword={tags && tags.length ? tags[selectedTagIndex].name : ''} />
      </Box>
    </Box>
  )
}

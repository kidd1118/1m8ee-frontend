import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useCallback, useEffect, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { RootState } from '../store'
import { ITag, ITagsRequest } from '../services/tags'
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector'
import { getTagsAsync } from '../store/tags'
import Questions from '../components/questions'

export default function Page() {
  const isGetData = useRef(false)
  const dispatch = useAppDispatch()
  const [keyword, setKeyword] = useState('')
  const [loadingDisplay, setLoadingDisplay] = useState(true)
  const tags: Array<ITag> = useTypedSelector((state: RootState) => state.tags.list)

  const fetchData = useCallback(async () => {
    setLoadingDisplay(true)
    const params: ITagsRequest = { inname: keyword }
    await dispatch(getTagsAsync(params))
    setLoadingDisplay(false)
  }, [dispatch, keyword])

  useEffect(() => {
    if (isGetData.current) return
    isGetData.current = true
    fetchData()
  }, [fetchData])

  return (
    <Box sx={{ padding: 10 }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Input
          fullWidth
          placeholder="Tag"
          value={keyword}
          onChange={(newValue) => setKeyword(newValue.target.value)}
        />
        <Button variant="contained" onClick={fetchData}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h6">Trending</Typography>
        <CircularProgress
          size={25}
          color="inherit"
          sx={{ display: loadingDisplay ? 'block' : 'none', marginLeft: '5px' }}
        />
        <Box sx={{ display: loadingDisplay ? 'none' : 'block' }}>
          {tags &&
            tags.map((tag: ITag, index) => (
              <Chip
                sx={{ margin: '5px' }}
                label={tag.name}
                component="a"
                clickable
                key={tag.name}
                variant={index === 0 ? 'filled' : 'outlined'}
                onClick={() => {}}
              />
            ))}
        </Box>
      </Box>
      <Questions />
    </Box>
  )
}

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

export default function Page() {
  const isGetData = useRef(false)
  const dispatch = useAppDispatch()
  const [keyword, setKeyword] = useState('')
  const [loadingDisplay, setLoadingDisplay] = useState('block')
  const tags: Array<ITag> = useTypedSelector((state: RootState) => state.tags.list)

  const fetchData = useCallback(async () => {
    setLoadingDisplay('block')
    const params: ITagsRequest = { inname: keyword }
    await dispatch(getTagsAsync(params))
    setLoadingDisplay('none')
  }, [dispatch, keyword])

  useEffect(() => {
    if (isGetData.current) return
    isGetData.current = true
    fetchData()
  }, [fetchData])

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '70px', zIndex: 100 }}>
        <Input
          fullWidth
          placeholder="Tag"
          value={keyword}
          onChange={(newValue) => setKeyword(newValue.target.value)}
        />
        <Button onClick={fetchData}>Search</Button>
        <Typography variant="h6">Trending</Typography>
        {tags &&
          tags.map((tag: ITag, index) => (
            <Chip
              label={tag.name}
              component="a"
              href="#basic-chip"
              clickable
              key={tag.name}
              variant={index === 0 ? 'filled' : 'outlined'}
            />
          ))}
        <CircularProgress color="inherit" sx={{ display: loadingDisplay }} />
      </Box>
    </Box>
  )
}

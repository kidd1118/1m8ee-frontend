import * as React from 'react'
import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

interface Props {
  value: string
  label: string
  onChange: (value: any) => void
}

const Input = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    border: '3px solid rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    color: '#FFFFFF',
    '&:focus': {
      borderColor: '#FF9B33',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
}))

export default function AhaInput({ value, label, onChange }: Props) {
  return <Input fullWidth value={value} placeholder={label} onChange={onChange} />
}

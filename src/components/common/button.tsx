import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'

const CustomeButton = styled(Button)(() => ({
  height: 40,
  width: 340,
  border: 1,
  borderColor: '#FFFFFF',
  borderStyle: 'solid',
  color: '#121212',
  backgroundColor: '#FFFFFF',
  borderRadius: 4,
  fontWeight: 800,
  '&:focus, &:active': {
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
  },
  '&:hover': {
    backgroundColor: '#121212',
    boxShadow: 'none',
    color: '#FFFFFF',
  },
}))
interface Props {
  children: string
  onClick: () => void
}

export default function AhaButton({ children, onClick }: Props) {
  return (
    <CustomeButton disableRipple color="inherit" onClick={onClick}>
      {children}
    </CustomeButton>
  )
}

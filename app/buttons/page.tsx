import { Button } from '@/components/ui/button'
import React from 'react'

const ButtonsPage = () => {
  return (
    <div className='flex flex-col p-4 max-w-[200px] gap-4'>
        <Button>Default</Button>
        <Button variant="primary">Primary</Button> 
        <Button variant="primaryOutline"  size="lg">Primary outline</Button>
        <Button variant="secondary">Secondary</Button> 
        <Button variant="secondaryOutline"  size="lg">secondary outline</Button>
        <Button variant="danger">danger</Button> 
        <Button variant="dangerOutline"  size="lg">danger outline</Button>
        <Button variant="super">super</Button> 
        <Button variant="superOutline"  size="lg">super outline</Button>
        <Button variant="ghost"  size="lg">ghost</Button>

        <Button variant="sidebar">sidebar</Button> 
        <Button variant="sidebarOutline"  size="lg">sidebar outline</Button>
    </div>
  )
}

export default ButtonsPage
import AppSidebar from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode;}) => {
  return (
    <div>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='bg-accent/20'>
                {children}
            </SidebarInset>
        </SidebarProvider>
    </div>
  )
}

export default layout
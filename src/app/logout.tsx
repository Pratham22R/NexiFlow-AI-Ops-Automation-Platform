"use client"
import { Button } from '@/components/ui/button'
import { authclient } from '@/lib/auth-client'

const Logout = () => {
  return (
    <div>
        <Button onClick={()=> authclient.signOut()}>
            Logout
        </Button>
    </div>
  )
}

export default Logout
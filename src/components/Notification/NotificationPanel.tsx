import React from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleCheckBig } from 'lucide-react'

type Notification = {
  id: string
  avatar: string
  name: string
  action: string
  timestamp: string
  details?: string
}

const notifications: Notification[] = [
  {
    id: '1',
    avatar: '/avatars/01.png',
    name: 'Test',
    action: 'requested access to UNIX directory tree hierarchy',
    timestamp: 'Today at 9:42 AM',
  },
  {
    id: '2',
    avatar: '/avatars/02.png',
    name: 'Ray Arnold',
    action: 'has created an inventory request that is due in 3 weeks for approval',
    timestamp: 'Yesterday at 11:42 PM',
  },
  {
    id: '3',
    avatar: '',
    name: 'Dennis Nedry',
    action: 'commented on BOM compliance report',
    timestamp: 'Yesterday at 5:42 PM',
    details: '"Oh, I noticed that the figures in the BOM needs to be updated. We are short of some materials."',
  },
]

export default function NotificationPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center py-2 px-4 border-b">
        <h2 className="text-lg text-[#1A1F36] font-semibold">Notificações</h2>
        <Button variant="ghost" size="sm" className='font-medium text-[#1A1F36]'>
          Mark all as read
          <CircleCheckBig className='ml-1 text-[#1A1F36]'/>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b last:border-b-0">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={notification.avatar} alt={notification.name} />
                <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">
                  <span className="font-semibold">{notification.name}</span> {notification.action}
                </p>
                {notification.details && (
                  <p className="text-sm text-gray-500">{notification.details}</p>
                )}
                <p className="text-xs text-gray-400">{notification.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
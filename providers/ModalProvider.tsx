import BookCarModal from '@/components/modals/BookCarModal'
import EditCarsModal from '@/components/modals/EditCarsModal'
import React from 'react'

export default function ModalProvider() {
  return (
    <div>
      <EditCarsModal />
      <BookCarModal />
    </div>
  )
}

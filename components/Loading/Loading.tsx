import Image from 'next/image'
import React from 'react'
import LoadingSpinner from '../../assets/img/loading.svg'

export const Loading = () => {
  return (
    <div className="text-center py-2">
      <Image className="loading-icon" src={LoadingSpinner} width={30} height={30} />
    </div>
  )
}

import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import backArrow from '../../assets/img/arrow.svg'

export const BackButton = () => {
  const router = useRouter()

  return (
    <button className="back_btn" onClick={() => router.back()}>
      <Image
        src={backArrow}
        alt="Icon"
        width={40}
        height={30}
        style={{
          transform: 'rotate(180deg)',
        }}
      />
    </button>
  )
}

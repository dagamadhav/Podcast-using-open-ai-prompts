'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { cn } from '@/lib/utils';

function LeftSideBar() {
    const pathname = usePathname();
    const router = useRouter;

  return (
    <section className='left_sidebar'>
        <nav className='flex flex-col gap-6'>
            <Link className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center' href='/'>
                <Image src="/icons/logo.svg" width={23} height={27}/>
                <h1 className='text-24 fonr-extrabold text-white max-lg:hidden'>Podcaster</h1>
            </Link>
            {sidebarLinks.map(({route,label,imgURL})=>{
                const isActive = pathname === route || pathname.startsWith(`${route}/`)

                return <Link href={route} key={label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start',{
                    'bg-nav-focus border-r-4 border-orange-1': isActive
                })}>
                    <Image src={imgURL} width={24} height={24}/>
                    <p>{label}</p>
                </Link>
            })
            }
        </nav>
    </section>
  )
}

export default LeftSideBar

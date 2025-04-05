"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path)
  }, [])

  return (
    <div className="w-full p-4 bg-secondary shadow-md">
      <ul className="flex items-center justify-between w-full max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" className="max-w-full" width={60} height={90} alt="hksd" />
          <li className="text-blue-900 font-bold text-xl">InterviewMocker</li>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <li className={`hover:text-primary hover:font-bold ${path === '/dashboard' && 'text-primary font-bold'}`}>
            <Link href="/dashboard">
              <Button className="cursor-pointer text-lg">Dashboard</Button>
            </Link>
          </li>
          <li className="hover:text-primary hover:font-bold">
            <Button className="cursor-pointer text-lg">Questions</Button>
          </li>
          <li className="hover:text-primary hover:font-bold">
            <Button className="cursor-pointer text-lg">Upgrade</Button>
          </li>
          <li className={`hover:text-primary hover:font-bold ${path === '/dashboard/how-it-works' && 'text-primary font-bold'}`}>
            <Link href="/dashboard/how-it-works">
              <Button className="cursor-pointer text-lg">How it works?</Button>
            </Link>
          </li>
        </div>

        {/* User Button */}
        <UserButton />
      </ul>
    </div>
  )
}

export default Header;

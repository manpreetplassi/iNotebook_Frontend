import React, {  useState } from 'react'
import {
  Link,
  Outlet,
  useLocation
} from "react-router-dom";
import Alert from './Alert';
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Navbar() {

  let location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/home" className="-m-1.5 p-1.5">
              <div className='text-xl font-medium'>iNotebook</div> 
              {/* <span className="sr-only">iNotebook</span> */}
              {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link to="/home" className={`text-sm font-semibold leading-6 text-gray-900 ${location.pathname === "/home" ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/about" className={`text-sm font-semibold leading-6 text-gray-900 ${location.pathname === "/about" ? "active" : ""}`}>
              About
            </Link>
            <Link to="/signup" className={`text-sm font-semibold leading-6 text-gray-900 ${location.pathname === "/signup" ? "active" : ""}`}>
              SignUp
            </Link>
            <Link to="/login" className={`text-sm font-semibold leading-6 text-gray-900 ${location.pathname === "/login" ? "active" : ""}`}>
              Login
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className={`text-sm font-semibold leading-6 text-gray-900 ${location.pathname === "/home" ? "active" : ""}`}>
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/home" className="-m-1.5 p-1.5">
              <div className='text-xl font-medium'>iNotebook</div> 
                {/* <span className="sr-only">iNotebook</span>
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/> */}
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to="/home" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${location.pathname === "/home" ? "active" : ""}`}>
                    Home
                  </Link>
                  <Link to="/about" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${location.pathname === "/about" ? "active" : ""}`}>
                    About
                  </Link>
                  <Link to="/signup" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${location.pathname === "/signup" ? "active" : ""}`}>
                    signup
                  </Link>
                  <Link to="/login" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${location.pathname === "/login" ? "active" : ""}`}>
                    Login
                  </Link>
                </div>
                <div className="py-6">
                  <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {/* <div className='mx-6'><Alert messege={"this is alert messege"} /></div> */}
      <Alert messege={"this is alert messege"} />
      <Outlet />

    </>
  )
}

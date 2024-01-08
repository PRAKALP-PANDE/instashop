import React, { useEffect } from 'react'
import mongoose from 'mongoose'
import Order from '@/models/Order'
import { useRouter } from 'next/router'

const Orders = () => {

  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [router.query])
  return (
    <div>
      <div className="container mx-auto">
        {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
        <h1 className='font-semibold text-center text-2xl p-8'>My Orders</h1>
        {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">First</th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Last</th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Mark</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Otto</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@mdo</td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Jacob</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Thornton</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@fat</td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Larry</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Wild</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let orders = await Order.find({})

  return {
    props: { orders: orders }, // will be passes to the page component as props
  }
}

export default Orders
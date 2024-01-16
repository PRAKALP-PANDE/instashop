import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
      })
      let res = await a.json()
      setOrders(res.orders);
      // console.log(res);
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders()
    }
  }, [])
  return (
    <div className='min-h-screen'>
      {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
      <h1 className='font-semibold text-center text-2xl p-8'>My Orders</h1>
      <div className="container mx-auto">
        {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"># Order Id</th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Phone</th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Amount</th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orders.map((item) => {
                      return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.email}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.phone}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.amount}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link className='cursor-pointer' href={'/order?id=' + item._id}>Details</Link>
                        </td>
                      </tr>
                    })}

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

export default Orders
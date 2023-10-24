import OrderCard from '@/components/OrderCard'
import { db } from '@/lib/db'
import Image from 'next/image'

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    include:{
      car:true
    }
  })
  return (
    <div>
      <h2 className="font-semibold text-lg text-slate-600">Rent cars as you go with ease action</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          orders?.map(order => <OrderCard order={order} />)
        }
      </div>
    </div>
  )
}

import axios from 'axios';
import { useState, useEffect } from 'react';
import { backendUrl, currency, formatNumberWithCommas } from '../util';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { success, message, orders } = response.data;
      if (success) {
        setOrders(orders.reverse());
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatus = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/update`,
        { orderId, status: e.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { success, message } = response.data;
      if (success) {
        await fetchOrders();
        toast.success(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);
  return (
    <div className="">
      <h3 className="">Order Page</h3>
      <div className="">
        {orders.map((o, i) => (
          <div
            className="grid grid-cols-1 sm:grid-cols[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={i}
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />

            <div className="">
              <div className="">
                {o.items.map((item, i) => {
                  if (i === o.items.length - 1) {
                    return (
                      <p className="py-0.5" key={i}>
                        {item.name} x {item.quantity}{' '}
                        <span className="">{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={i}>
                        {item.name} x {item.quantity}{' '}
                        <span className="">{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>

              <p className="capitalize mt-3 mb-2 font-medium">
                {o.address.firstName + ' ' + o.address.lastName}
              </p>
              <div className="">
                <p className="">
                  {o.address.street}, {o.address.city}, {o.address.state},{' '}
                  {o.address.country}, {o.address.zipCode}
                </p>
              </div>
              <p className="">{o.address.phone}</p>
            </div>
            <div className="">
              <p className="text-sm sm:text-[15px]">Items: {o.items.length}</p>
              <p className="mt-3">Method: {o.paymentMethod}</p>
              <p className="">Payment: {o.payment ? 'Done' : 'Pending'}</p>
              <p className="">Date: {new Date(o.date).toDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency} {formatNumberWithCommas(o.amount)}
            </p>
            <select
              onChange={(e) => handleStatus(e, o._id)}
              value={o.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed" className="">
                Order Placed
              </option>
              <option value="Shipped" className="">
                Shipped
              </option>
              <option value="Delivered" className="">
                Delivered
              </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

import { useState, useEffect } from 'react';
import { backendUrl, currency } from '../util';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { success, message, data } = response.data;
      if (success) {
        setList(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message);
        await fetchList();
      } else {
        toast.error('failed');
        console.log(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        {/*  table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b className="">Image</b>
          <b className="">Name</b>
          <b className="">Category</b>
          <b className="text-center">Price</b>
          <b className="text-center">Action</b>
        </div>

        {/*  product list */}
        {list.map((p, i) => {
          return (
            <div
              className="grid grid-cols-[1fr, 3fr, 1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
              key={i}
            >
              <img src={p.images[0]} alt="" className="w-12" />
              <p className="">{p.name}</p>
              <p className="">{p.category}</p>
              <p className="text-center">
                {currency}
                {p.price}
              </p>
              <p
                onClick={() => removeProduct(p._id)}
                className="text-right md:text-center cursor-pointer text-lg"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;

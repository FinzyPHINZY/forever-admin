import { useState } from 'react';
import { assets } from '../assets/assets';
import { backendUrl } from '../util';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        setName('');
        setDescription('');
        setBestseller(false);
        setPrice('');
        setSubCategory('Topwear');
        setCategory('Men');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div className="">
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1" className="">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              className=""
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2" className="">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              className=""
              id="image2"
              hidden
            />
          </label>{' '}
          <label htmlFor="3" className="">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              className=""
              id="3"
              hidden
            />
          </label>{' '}
          <label htmlFor="image4" className="">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              className=""
              id="image4"
              hidden
            />
          </label>{' '}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="type here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men" className="">
              Men
            </option>
            <option value="Women" className="">
              Women
            </option>
            <option value="Kids" className="">
              Kids
            </option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear" className="">
              Topwear
            </option>
            <option value="Bottomwear" className="">
              Bottomwear
            </option>
            <option value="Winterwear" className="">
              Winterwear
            </option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="250"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
      </div>

      <div className="">
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes('S')
                  ? prev.filter((item) => item !== 'S')
                  : [...prev, 'S']
              )
            }
          >
            <p
              className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes('M')
                  ? prev.filter((item) => item !== 'M')
                  : [...prev, 'M']
              )
            }
          >
            <p
              className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes('L')
                  ? prev.filter((item) => item !== 'L')
                  : [...prev, 'L']
              )
            }
          >
            <p
              className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes('XL')
                  ? prev.filter((item) => item !== 'XL')
                  : [...prev, 'XL']
              )
            }
          >
            <p
              className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes('XXL')
                  ? prev.filter((item) => item !== 'XXL')
                  : [...prev, 'XXL']
              )
            }
          >
            <p
              className={`${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          className=""
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label
          htmlFor="bestseller"
          className="cursor-pointer"
          onChange={() => setBestseller(!bestseller)}
          value={bestseller}
        >
          Add to Best Sellers
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        Add Product
      </button>
    </form>
  );
};

export default Add;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllProductAsync,
  fetchProductByFiltersAsync,
  fetchProductBySearchAsync,
  selectAllProduct,
  selectTotal
} from '../../product/productSlice';
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' }
]
const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'brand',
    name: 'brand',
    options: [
      { value: 'Apple', label: 'Apple', checked: false },
      { value: 'Samsung', label: 'Samsung', checked: false },
      { value: 'OPPO', label: 'OPPO', checked: false },
      { value: 'Huawei', label: 'Huawei', checked: false },
      {
        value: 'Microsoft Surface',
        label: 'Microsoft Surface',
        checked: false,
      },
      { value: 'Infinix', label: 'Infinix', checked: false },
      { value: 'HP Pavilion', label: 'HP Pavilion', checked: false },
      {
        value: 'Impression of Acqua Di Gio',
        label: 'Impression of Acqua Di Gio',
        checked: false,
      },
      { value: 'Royal_Mirage', label: 'Royal_Mirage', checked: false },
      {
        value: 'Fog Scent Xpressio',
        label: 'Fog Scent Xpressio',
        checked: false,
      },
      { value: 'Al Munakh', label: 'Al Munakh', checked: false },
      { value: 'Lord - Al-Rehab', label: 'Lord   Al Rehab', checked: false },
      { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
      { value: 'Hemani Tea', label: 'Hemani Tea', checked: false },
      { value: 'Dermive', label: 'Dermive', checked: false },
      { value: 'ROREC White Rice', label: 'ROREC White Rice', checked: false },
      { value: 'Fair & Clear', label: 'Fair & Clear', checked: false },
      { value: 'Saaf & Khaas', label: 'Saaf & Khaas', checked: false },
      { value: 'Bake Parlor Big', label: 'Bake Parlor Big', checked: false },
      {
        value: 'Baking Food Items',
        label: 'Baking Food Items',
        checked: false,
      },
      { value: 'fauji', label: 'fauji', checked: false },
      { value: 'Dry Rose', label: 'Dry Rose', checked: false },
      { value: 'Boho Decor', label: 'Boho Decor', checked: false },
      { value: 'Flying Wooden', label: 'Flying Wooden', checked: false },
      { value: 'LED Lights', label: 'LED Lights', checked: false },
      { value: 'luxury palace', label: 'luxury palace', checked: false },
      { value: 'Golden', label: 'Golden', checked: false },
      {
        value: 'Furniture Bed Set',
        label: 'Furniture Bed Set',
        checked: false,
      },
      { value: 'Ratttan Outdoor', label: 'Ratttan Outdoor', checked: false },
      { value: 'Kitchen Shelf', label: 'Kitchen Shelf', checked: false },
      { value: 'Multi Purpose', label: 'Multi Purpose', checked: false },
      { value: 'AmnaMart', label: 'AmnaMart', checked: false },
      {
        value: 'Professional Wear',
        label: 'Professional Wear',
        checked: false,
      },
      { value: 'Soft Cotton', label: 'Soft Cotton', checked: false },
      { value: 'Top Sweater', label: 'Top Sweater', checked: false },
      {
        value: 'RED MICKY MOUSE..',
        label: 'RED MICKY MOUSE..',
        checked: false,
      },
      { value: 'Digital Printed', label: 'Digital Printed', checked: false },
      { value: 'Ghazi Fabric', label: 'Ghazi Fabric', checked: false },
      { value: 'IELGY', label: 'IELGY', checked: false },
      { value: 'IELGY fashion', label: 'IELGY fashion', checked: false },
      {
        value: 'Synthetic Leather',
        label: 'Synthetic Leather',
        checked: false,
      },
      {
        value: 'Sandals Flip Flops',
        label: 'Sandals Flip Flops',
        checked: false,
      },
      { value: 'Maasai Sandals', label: 'Maasai Sandals', checked: false },
      { value: 'Arrivals Genuine', label: 'Arrivals Genuine', checked: false },
      { value: 'Vintage Apparel', label: 'Vintage Apparel', checked: false },
      { value: 'FREE FIRE', label: 'FREE FIRE', checked: false },
      { value: 'The Warehouse', label: 'The Warehouse', checked: false },
      { value: 'Sneakers', label: 'Sneakers', checked: false },
      { value: 'Rubber', label: 'Rubber', checked: false },
      { value: 'Naviforce', label: 'Naviforce', checked: false },
      { value: 'SKMEI 9117', label: 'SKMEI 9117', checked: false },
      { value: 'Strap Skeleton', label: 'Strap Skeleton', checked: false },
      { value: 'Stainless', label: 'Stainless', checked: false },
      { value: 'Eastern Watches', label: 'Eastern Watches', checked: false },
      { value: 'Luxury Digital', label: 'Luxury Digital', checked: false },
      { value: 'Watch Pearls', label: 'Watch Pearls', checked: false },
      { value: 'Bracelet', label: 'Bracelet', checked: false },
      { value: 'LouisWill', label: 'LouisWill', checked: false },
      { value: 'Copenhagen Luxe', label: 'Copenhagen Luxe', checked: false },
      { value: 'Steal Frame', label: 'Steal Frame', checked: false },
      { value: 'Darojay', label: 'Darojay', checked: false },
      {
        value: 'Fashion Jewellery',
        label: 'Fashion Jewellery',
        checked: false,
      },
      { value: 'Cuff Butterfly', label: 'Cuff Butterfly', checked: false },
      {
        value: 'Designer Sun Glasses',
        label: 'Designer Sun Glasses',
        checked: false,
      },
      { value: 'mastar watch', label: 'mastar watch', checked: false },
      { value: 'Car Aux', label: 'Car Aux', checked: false },
      { value: 'W1209 DC12V', label: 'W1209 DC12V', checked: false },
      { value: 'TC Reusable', label: 'TC Reusable', checked: false },
      { value: 'Neon LED Light', label: 'Neon LED Light', checked: false },
      {
        value: 'METRO 70cc Motorcycle - MR70',
        label: 'METRO 70cc Motorcycle   MR70',
        checked: false,
      },
      { value: 'BRAVE BULL', label: 'BRAVE BULL', checked: false },
      { value: 'shock absorber', label: 'shock absorber', checked: false },
      { value: 'JIEPOLLY', label: 'JIEPOLLY', checked: false },
      { value: 'Xiangle', label: 'Xiangle', checked: false },
      {
        value: 'lightingbrilliance',
        label: 'lightingbrilliance',
        checked: false,
      },
      { value: 'Ifei Home', label: 'Ifei Home', checked: false },
      { value: 'DADAWU', label: 'DADAWU', checked: false },
      { value: 'YIOSI', label: 'YIOSI', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'smartphones', label: 'smartphones', checked: false },
      { value: 'laptops', label: 'laptops', checked: false },
      { value: 'fragrances', label: 'fragrances', checked: false },
      { value: 'skincare', label: 'skincare', checked: false },
      { value: 'groceries', label: 'groceries', checked: false },
      { value: 'home-decoration', label: 'home decoration', checked: false },
      { value: 'furniture', label: 'furniture', checked: false },
      { value: 'tops', label: 'tops', checked: false },
      { value: 'womens-dresses', label: 'womens dresses', checked: false },
      { value: 'womens-shoes', label: 'womens shoes', checked: false },
      { value: 'mens-shirts', label: 'mens shirts', checked: false },
      { value: 'mens-shoes', label: 'mens shoes', checked: false },
      { value: 'mens-watches', label: 'mens watches', checked: false },
      { value: 'womens-watches', label: 'womens watches', checked: false },
      { value: 'womens-bags', label: 'womens bags', checked: false },
      { value: 'womens-jewellery', label: 'womens jewellery', checked: false },
      { value: 'sunglasses', label: 'sunglasses', checked: false },
      { value: 'automotive', label: 'automotive', checked: false },
      { value: 'motorcycle', label: 'motorcycle', checked: false },
      { value: 'lighting', label: 'lighting', checked: false },
    ],
  },
  
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Product() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const products=useSelector(selectAllProduct);
  const totalItems=useSelector(selectTotal); 

  // const products=useSelector((state)=>state.product.products);
  const [filter,setfilter]=useState({});
  const [sort,setsort]=useState({});
  const [page,setPage]=useState({});
  const [index,setIndex]=useState(1);
  const [search,setSearch]=useState();
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  const handleClickSearch=()=>{
    if(search=="All"){
      dispatch(fetchAllProductAsync());
    }else{

      dispatch(fetchProductBySearchAsync( search));
    }
    // setSearch(null);
  }
  const totalPages=totalItems/10;

  const handleFilter=(e,section,option)=>{
      // e.preventDefault();
      const newfilter={...filter};
      if(e.target.checked){
        if(newfilter[section.id]){
          newfilter[section.id].push(option.value);
        }else{
          newfilter[section.id]=[option.value]
        }
      }else{
        const index=newfilter[section.id].findIndex(tr=>tr===option.value)
        newfilter[section.id].splice(index,1);
      }
      setfilter(newfilter);
      console.log(newfilter);
      // dispatch(fetchProductByFiltersAsync(newfilter,sort));

   }

   const handleSort=(e,option)=>{
      const newfilter={_sort:option.sort,_order:option.order}
      setsort(newfilter);
      
   }
   

   const handlepage=(i)=>{
    const newfilter={_page:i,_limit:10}
    setPage(newfilter);
    setIndex(i);
    console.log(i)
   }




  useEffect(()=>{
    dispatch(fetchProductByFiltersAsync({filter,sort,page}));
  },[dispatch,filter,sort,page])
  return (

    <div>
      <div>
      <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={e=>handleFilter(e,section,option)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
            <div className="flex items-center justify-center rounded-full border-2 b-">
  <div className="flex rounded-full px-2 w-full max-w-[750px] focus:outline-none">
    <button className="self-center flex p-1 cursor-pointer  ">
      {" "}
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={2} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z"
            stroke="#ff5c5c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z"
            stroke="#ff5c5c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z"
            fill="#ff5c5c"
          />{" "}
        </g>
      </svg>
    </button>
    <input
      type="text"
      className="w-full 
       flex bg-transparent pl-2  border-0 text-center focus:outline-none focus:ring-transparent"
       onChange={handleSearch}
      placeholder="Search Product"
    />
    <button type="submit" className="relative p-2 ml-4 rounded-full bg-gray-50" onClick={handleClickSearch}>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="#999"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>
      </svg>
    </button>
  </div>
</div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={e=>handleSort(e,option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
               

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={e=>handleFilter(e,section,option)}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">  <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
       
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
             <Link to={`/productDetail/${product.id}`} key={product.id}>
             <div className="group relative border-solid border-2 p-2 border-gray-200">
               <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                 <img
                   src={product.thumbnail}
                   alt={product.title}
                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                 />
               </div>
               <div className="mt-4 flex justify-between">
                 <div>
                   <h3 className="text-sm text-gray-700">
                     <a href={product.thumbnail}>
                       <span
                         aria-hidden="true"
                         className="absolute inset-0"
                       />
                       {product.title}
                     </a>
                   </h3>
                   <p className="mt-1 text-sm text-gray-500">
                     <StarIcon className="w-6 h-6 font-bold inline"></StarIcon>
                     <span className=" align-bottom">
                       {product.rating}
                     </span>
                   </p>
                 </div>
                 <div>
                   <p className="text-sm block font-medium text-gray-900">
                     $
                     {Math.round(
                       product.price *
                         (1 - product.discountPercentage / 100)
                     )}
                   </p>
                   <p className="text-sm block line-through font-medium text-gray-400">
                     ${product.price}
                   </p>
                 </div>
               </div>
               {/* <p className="text-sm font-medium text-gray-900">
                 {product.price}
               </p> */}
             </div>
           
            </Link>
          ))}
        </div>
      </div>
    </div></div>
    
            </div>
          </section>
          {/* pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(index-1)*10+1}</span> to <span className="font-medium">{index*10}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div
              onClick={(e) => handlepage(index > 1 ? index - 1 : index)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <div className='border border-solid border-gray-300 border-l-2'>
            {(() => {
              const elements=[]
              for (let i=1; i <=totalPages; i++) {
                elements.push(<a
                  href="#"
                  aria-current="page"
                  onClick={e=>handlepage(i)} 
                  className={`relative z-10 inline-flex border border-solid border-gray-100 border-l-2 items-center ${index===i ? 'bg-indigo-600 text-white' :'bg-white text-black' }  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {i}
                </a>
                );
              }
              return elements;
            })()}
            </div>
            
             
            
            <div
              onClick={(e) => handlepage(index < totalPages ? index + 1 : index)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
        </main>
      </div>
    </div>
    
      </div>
    </div>
  );
}

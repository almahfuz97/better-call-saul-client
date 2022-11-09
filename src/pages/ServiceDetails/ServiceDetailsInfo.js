import React from 'react'
import RatingStar from '../../utils/RatingStar';

export default function ServiceDetailsInfo({ service, review }) {
    const { service_name, description, price, rating, service_img, _id, description2 } = service;
    const desArr = description2 && description2.split('+');
    return (
        <div className='grid grid-cols-12 mt-8'>
            <div className=' col-span-12 md:col-span-6 relative   flex items-center justify-center'>
                <img src={service_img} alt="" className='w-full border-4 h-[512px] top-0 rounded rounded-br-none rounded-tr-none rounded-bl-none md:rounded' />
            </div>
            <div className=' col-span-12 md:col-span-6 px-4 pb-4  overflow-y-scroll h-[512px] border-4 pt-4 '>
                <div>
                    <div className='flex justify-between items-center'>
                        <h1 className=' font-bold text-xl'>{service_name}</h1>

                    </div>
                    <RatingStar rating={rating}></RatingStar>
                    <div className='mb-5'>
                        <small className='mr-4 opacity-80'>Price: <span className='text-yellow-400 font-bold'>${price}</span></small>
                        <small>Total Ratings: <span className=' text-yellow-400 font-bold'>`1005`+</span></small>
                    </div>
                    <div>
                        {description}
                    </div>
                    <div className='mt-8'>
                        {
                            review &&
                            desArr?.map((item, index) => {

                                return (
                                    index === 0
                                        ?
                                        <p key={item} className=' font-bold mb-1'> {item}:</p>
                                        :
                                        <li key={item}>{item}</li>
                                )


                            }
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
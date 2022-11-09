import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import pfp from '../../assets/profile.svg'
import { useForm } from 'react-hook-form';
import { data } from 'autoprefixer';

export default function ReviewForm({ service, newReviews }) {
    const { service_name, _id } = service;
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, watch, submittedData, formState, formState: { errors }, reset } = useForm();
    const [rating, setRating] = useState(5);

    // set rating on select, using 'watch' of use form
    useEffect(() => {
        setRating(watch('rating'))
    }, [watch])

    // resetting form
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ reviewText: '', rating: '5' });
        }
    }, [formState, submittedData, reset]);

    // set profile photo
    const profileImg =
        <div className='relative flex items-center'>
            <img src={user?.photoURL} onError={(e) => {
                if (e.target.src !== pfp) {
                    e.target.src = pfp
                }
            }} className=' bg-transparent z-10 cursor-pointer w-12 h-12 rounded-full mr-4' />
        </div>

    // onSubmit
    const onSubmit = data => {
        console.log(data);
        setRating(data.rating);

        const reviewData = {
            ...data,
            email: user.email,
            serviceId: _id,
            displayName: user.displayName,
            createdAt: Date.now(),
            profileURL: user.photoURL,
            service_name

        }
        console.log(reviewData)

        fetch(`https://service-a11-server.vercel.app/review/service/${_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.result);
                console.log(data.reviews);
                newReviews(data.reviews);
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='flex justify-center'>
            <div className='flex  w-full md:w-1/2 '>
                <div className='mr-2'>
                    {profileImg}
                </div>
                <div className='w-full '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea {...register('reviewText', { required: true })} className=' min-h-[100px] w-full rounded' placeholder='write your review...' />
                        <div className='flex items-center mt-4' >
                            <p className='mr-2 font-bold'>Rating:</p>
                            <p className='mr-4'>{rating}</p>
                            <select defaultValue='5' {...register('rating', { required: true })} className='rounded h-4 p-3.5 '>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <div className='flex justify-end w-full'>
                                <button type='submit' className='border px-4 py-2 ml-2 rounded shadow drop-shadow hover:bg-slate-50'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

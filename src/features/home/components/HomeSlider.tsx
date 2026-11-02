'use client'

import HomeSliderImg from '../../../assets/images/home-slider-1.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { IconChevronLeft, IconChevronRight, IconHeadset, IconRotate2, IconShieldCheck, IconTruck } from '@tabler/icons-react';


export default function HomeSlider() {
    return (
        <>
            <section className=' relative'>
                <Swiper slidesPerView={1} loop={true} modules={[Navigation, Pagination]}
                 navigation={{prevEl: ".prev-btn", nextEl: ".next-btn"}}
                 pagination={{clickable:true}}>
                    <SwiperSlide>
                        <div className='py-20 text-white' style={{
                            backgroundImage: `linear-gradient(to bottom right, rgb(19 241 115 / 80%), rgb(24 182 83 / 80%)), url('${HomeSliderImg.src}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <div className="container-fluid mx-6">
                                <h2 className='text-3xl font-bold max-w-96'>Fresh Products Delivered to your Door</h2>
                                <p className='text-lg mt-3'>Get 20% off your first order</p>
                                <div className="action-btns mt-6 space-x-2 *:hover:scale-105 *:transition-transform *:duration-200">
                                    <button className='btn text-primary-500 border-2 border-white bg-white'>Shop Now</button>
                                    <button className='btn bg-transparent border-2 border-white/70 text-white'>View Deals</button>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='py-20 text-white' style={{
                            backgroundImage: `linear-gradient(to bottom right, rgb(19 241 115 / 80%), rgb(24 182 83 / 80%)), url('${HomeSliderImg.src}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <div className="container-fluid mx-6">
                                <h2 className='text-3xl font-bold max-w-96'>Premium Quality Guaranteed</h2>
                                <p className='text-lg mt-3'>Fresh from farm to your table</p>
                                <div className="action-btns mt-6 space-x-2 *:hover:scale-105 *:transition-transform *:duration-200">
                                    <button className='btn text-blue-500 border-2 border-white bg-white'>Shop Now</button>
                                    <button className='btn bg-transparent border-2 border-white/70 text-white'>Learn More</button>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='py-20 text-white' style={{
                            backgroundImage: `linear-gradient(to bottom right, rgb(19 241 115 / 80%), rgb(24 182 83 / 80%)), url('${HomeSliderImg.src}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <div className="container-fluid mx-6 my-5">
                                <h2 className='text-3xl font-bold max-w-96'>Fast & Free Delivery</h2>
                                <p className='text-lg mt-3'>Same day delivery available</p>
                                <div className="action-btns mt-6 space-x-2 *:hover:scale-105 *:transition-transform *:duration-200">
                                    <button className='btn text-purple-500 border-2 border-white bg-white'>Order Now</button>
                                    <button className='btn bg-transparent border-2 border-white/70 text-white'>Delivery Info</button>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>


                <button className='prev-btn size-10 rounded-full bg-white/90 flex justify-center items-center text-primary-600 shadow-md hover:scale-105 transition-transform duration-200 absolute top-1/2 left-5 z-5 -translate-y-1/2'>
                    <IconChevronLeft stroke={2} />
                </button>
                <button className='next-btn size-10 rounded-full bg-white/90 flex justify-center items-center text-primary-600 shadow-md hover:scale-105 transition-transform duration-200 absolute top-1/2 right-5 z-5 -translate-y-1/2'>
                    <IconChevronRight stroke={2} />
                </button>
            </section>









            <section className="py-8 bg-gray-50">
      <div className="container-fluid mx-3 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Free Shipping */}
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <IconTruck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Free Shipping</h3>
              <p className="text-xs text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-emerald-50 text-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <IconShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Secure Payment
              </h3>
              <p className="text-xs text-gray-500">100% secure transactions</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-orange-50 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <IconRotate2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Easy Returns</h3>
              <p className="text-xs text-gray-500">14-day return policy</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <IconHeadset className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">24/7 Support</h3>
              <p className="text-xs text-gray-500">Dedicated support team</p>
            </div>
          </div>

        </div>
      </div>
    </section>
        </>
    )
    
}

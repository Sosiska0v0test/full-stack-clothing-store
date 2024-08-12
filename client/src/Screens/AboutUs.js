import React from 'react'
import Layout from './../Layout/Layout'
import Head from '../Components/Head'
import { Link } from 'react-router-dom'

function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <Head title='Про нас' />
        <div className='xl:py-20 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                Ласкаво просимо на наш сайт
              </h3>
              <div className='mt-3 text-sm leading-8 text-mainText'>
                <p>
                  Ласкаво просимо до нашого сайту - вашого надійного провідника у світі чоловічого та жіночого одягу! Наша компанія заснована у 2002 році   </p>
              </div>
              <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl text-white block font-extrabold'>
                    10 000 +
                  </span>
                  <h4 className='text-lg text-white font-semibold my-1'>Товарів у нас на сайті</h4>
                  <p className='mb-0 text-text leading-7 text-sm '>
                    Нові товари що дня!
                  </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl text-white block font-extrabold'>
                    8 000 +
                  </span>
                  <h4 className='text-lg  text-white font-semibold my-1'>Користувачів</h4>
                  <p className='mb-0 text-text leading-7 text-sm '>
                    Раді бачити нових користувачів!
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-10 lg:mt-0'>
              <img src='/images/descAbout.jpg' alt='aboutus' className='w-full xl:block hidden h-header rounded-lg object-cover' />
            </div>
          </div>
        </div>




        <div className=''>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div className='flex justify-center'>
              <div className='mt-10 lg:mt-0'>
                <img src='/images/secondAbout.jpg' alt='aboutus' className='w-150 xl:block hidden rounded-lg object-cover mb-20' />
              </div>
            </div>
            <div>
              <div className='text-sm leading-8 text-mainText'>
                <p className='mb-4'>
                Наш інтернет-магазин створений для тих, хто цінує стиль, якість і зручність. Ми прагнемо зробити ваші покупки максимально приємними і простими, пропонуючи широкий асортимент одягу для будь-яких випадків. У нашій колекції ви знайдете найновіші тренди, класичні моделі та ексклюзивні речі, які допоможуть вам створити неповторний образ.                </p>
                <p className='mb-4'>
                Наша команда ретельно підбирає кожен товар, співпрацюючи лише з надійними виробниками, щоб гарантувати високу якість і комфорт. Ми розуміємо, наскільки важливо відчувати себе впевнено у своєму одязі, тому постійно оновлюємо наш асортимент, враховуючи ваші побажання та відгуки. Ми також дбаємо про ваш комфорт під час шопінгу, пропонуючи зручний інтерфейс сайту, швидку доставку та дружню підтримку клієнтів.                </p>
                <p className='mb-4'>
                Ми віримо, що кожна деталь важлива, тому приділяємо особливу увагу обслуговуванню та індивідуальному підходу до кожного клієнта. Наша мета – зробити так, щоб кожна покупка приносила вам радість і задоволення. Дякуємо, що обрали наш інтернет-магазин. Ми завжди раді бачити вас серед наших постійних клієнтів і готові допомогти вам знайти саме те, що ви шукаєте.</p>
               
                <p className='mb-20'>
                  Електронна пошта: <Link><span className='text-subMain'>email@gmail.com</span></Link>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default AboutUs
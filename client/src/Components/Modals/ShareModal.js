import React from 'react'
import MainModal from './MainModal'
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaViber } from 'react-icons/fa'
import { EmailShareButton, FacebookShareButton, InstapaperShareButton, TelegramShareButton, TwitterShareButton, ViberShareButton } from 'react-share'
import { MdEmail } from 'react-icons/md'

function ShareProductModal({ modalOpen, setModalOpen, product }) {
    const shareData = [
        {
            icon: FaFacebook,
            ShareButton: FacebookShareButton,
        },
        {
            icon: FaInstagram,
            ShareButton: InstapaperShareButton,
        },
        {
            icon: FaTelegram,
            ShareButton: TelegramShareButton,
        },
        {
            icon: FaViber,
            ShareButton: ViberShareButton,
        },
        {
            icon: FaTwitter,
            ShareButton: TwitterShareButton,
        },
        {
            icon: MdEmail,
            ShareButton: EmailShareButton,
        },
    ]

    const url = `${window.location.protocol}//${window.location.host}/product/${product?._id}`
    return (
        <MainModal modalOpen={ modalOpen } setModalOpen={ setModalOpen }>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-2xl text-mainText'>Поширити<span className='text-xl font-bold'> '{ product?.name }'</span></h2>
                <form className='flex-rows flex-wrap gap-6 mt-6'>
                    {
                        shareData.map((data, index) => (
                            <data.ShareButton key={ index } url={ url } quote='Product Site'>
                                <div className='w-12 transitions hover:bg-subMain hover:text-main flex-colo text-lg h-12 bg-mainText rounded bg-opacity-90'>
                                    <data.icon />
                                </div>
                            </data.ShareButton>
                        ))
                    }
                </form>
            </div>
        </MainModal>
    )
}

export default ShareProductModal
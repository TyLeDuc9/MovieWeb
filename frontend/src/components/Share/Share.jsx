import React, { useState, useEffect } from "react";
import {
    FaFacebook, FaTiktok, FaFacebookMessenger,
    FaXTwitter, FaTelegram, FaLink, FaXmark
} from "react-icons/fa6";

export const Share = ({ onClose }) => {
    const currentUrl = window.location.href;

    const [animation, setAnimation] = useState(false)
    useEffect(() => {
        setTimeout(()=>setAnimation(true), 10)
    }, [])

    const handleClose = () => {
        setAnimation(false);
        setTimeout(() => onClose(), 200); 
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl);
        alert("Đã copy link!");
    };

    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
            <div className={`bg-[#2a314e] p-6 rounded-xl lg:w-120 w-90 text-center lg:mb-0 mb-60
                 shadow-xl animate-fade relative ${animation ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-white cursor-pointer text-xl"
                >
                    <FaXmark />
                </button>

                <h2 className="lg:text-lg text-sm font-medium mb-4">Chia sẻ</h2>

                {/* ICON MẠNG XÃ HỘI */}
                <div className="flex justify-center gap-5 text-3xl lg:mb-5">

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 lg:py-3 lg:px-4 py-3 px-3 lg:text-lg text-sm  rounded-lg"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black lg:py-3 lg:px-4 py-3 px-3 lg:text-lg text-sm rounded-lg"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href={`https://t.me/share/url?url=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-400 lg:py-3 lg:px-4 py-3 px-3 lg:text-lg text-sm rounded-lg"
                    >
                        <FaTelegram />
                    </a>
                    <a
                        href={`https://www.tiktok.com/share?url=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-black lg:py-3 lg:px-4 py-3 px-3 lg:text-lg text-sm rounded-lg"
                    >
                        <FaTiktok />
                    </a>

                    <a
                        href={`https://www.facebook.com/dialog/send?link=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 lg:py-3 lg:px-4 py-3 px-3 lg:text-lg text-sm rounded-lg"
                    >
                        <FaFacebookMessenger />
                    </a>

                    <button
                        onClick={handleCopy}
                        className="bg-green-500 lg:py-3 lg:px-4 py-3 px-3 lg:text-lg text-sm rounded-lg"
                    >
                        <FaLink />
                    </button>

                </div>

            </div>
        </div>
    );
};

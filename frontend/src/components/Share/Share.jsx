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
            <div className={`bg-[#2a314e] p-6 rounded-xl w-120 text-center
                 shadow-xl animate-fade relative ${animation ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-white cursor-pointer text-xl"
                >
                    <FaXmark />
                </button>

                <h2 className="text-lg font-medium   mb-4">Chia sẻ</h2>

                {/* ICON MẠNG XÃ HỘI */}
                <div className="flex justify-center gap-5 text-3xl mb-5">

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 py-3 px-4 text-lg rounded-lg"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black py-3 px-4 text-lg rounded-lg"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href={`https://t.me/share/url?url=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-400 py-3 px-4 text-lg rounded-lg"
                    >
                        <FaTelegram />
                    </a>
                    <a
                        href={`https://www.tiktok.com/share?url=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-black py-3 px-4 text-lg rounded-lg"
                    >
                        <FaTiktok />
                    </a>

                    <a
                        href={`https://www.facebook.com/dialog/send?link=${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 py-3 px-4 text-lg rounded-lg"
                    >
                        <FaFacebookMessenger />
                    </a>

                    <button
                        onClick={handleCopy}
                        className="bg-green-500 py-3 px-4 text-lg rounded-lg"
                    >
                        <FaLink />
                    </button>

                </div>

            </div>
        </div>
    );
};

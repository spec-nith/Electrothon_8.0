"use client"
import React from 'react'
import DinoGame from '@/components/NotFound'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            `}</style>
            <div className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    src="/videos/bg.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black/60 to-black/80 z-10"></div>

                {/* Content Container */}
                <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
                    {/* 404 Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                            404
                        </h1>
                        <h2 className="text-xl md:text-2xl text-purple-300 mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '14px', lineHeight: '1.8' }}>
                            PAGE NOT FOUND
                        </h2>
                        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px', lineHeight: '1.8' }}>
                            LOOKS LIKE YOU VENTURED INTO THE WRONG DIMENSION
                        </p>
                    </div>

                    {/* Dino Game Container */}
                    <div className="w-full max-w-4xl bg-black/50 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
                        <p className="text-center text-purple-300 mb-4" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px', lineHeight: '1.8' }}>
                            PRESS SPACE TO PLAY
                        </p>
                        <DinoGame />
                    </div>

                    {/* Back Home Button */}
                    <Link
                        href="/"
                        className="mt-8 px-8 py-4 bg-purple-600/80 hover:bg-purple-500/80 text-white rounded-full backdrop-blur-sm border border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                        style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
                    >
                        RETURN HOME
                    </Link>
                </div>
            </div>
        </>
    )
}

export default page;

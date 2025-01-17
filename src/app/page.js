"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/student-life-1.jpg",
    "/student-life-2.jpg",
    "/student-life-3.jpg",
    "/student-life-4.jpg",
    "/student-life-5.jpg",
    "/student-life-6.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 3 : prevIndex - 1
    );
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/university-bg.jpg"
            alt="University background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
          <h1 className="text-5xl font-bold">Welcome to UniLife</h1>
          <h2 className="mt-4 text-3xl font-light">Experience the best university life</h2>
          <p className="mt-6 text-lg">
            Take a tour of our campus and discover what makes UniLife the perfect place for your academic journey.
            Our video tour will guide you through all the facilities and opportunities we offer.
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold">
              Take a Tour
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 px-6">
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md"
          >
            &#10094;
          </button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * 33.3333}%)`,
              }}
            >
              {images.map((src, index) => (
                <div key={index} className="min-w-1/3 px-2">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md"
          >
            &#10095;
          </button>
        </div>
      </div>
    </main>
  );
}

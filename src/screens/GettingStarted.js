import React, { useState } from 'react';

const slides = [
    {
        id: 1,
        title: "Slide 1",
        description: "This is slide 1",
        image: require("../assets/slide1.png"),
    },
    {
        id: 2,
        title: "Slide 2",
        description: "This is slide 2",
        image: require("../assets/slide2.png"),
    },
    {
        id: 3,
        title: "Slide 3",
        description: "This is slide 3",
        image: require("../assets/slide3.png"),
    },
    {
        id: 4,
        title: "Slide 4",
        description: "This is slide 4",
        image: require("../assets/slide4.png"),
    },
    {
        id: 5,
        title: "Slide 5",
        description: "This is slide 5",
        image: require("../assets/slide5.png"),
    },
];

function GettingStarted() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevious = () => {
        setCurrentSlide((prevSlide) => prevSlide - 1);
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => prevSlide + 1);
    };

    return (
        <div>
            <h1>Getting Started</h1>
            <div>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
            <div>
                <h2>{slides[currentSlide].title}</h2>
                <p>{slides[currentSlide].description}</p>
                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
            </div>
        </div>
    );
}

export default GettingStarted;

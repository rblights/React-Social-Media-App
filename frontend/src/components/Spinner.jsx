import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Hearts } from 'react-loader-spinner';

const Spinner = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <Hearts 
                color="red"
                height={50}
                width={200}
                wrapperClass="m-5"
            />
            <p className="text-lg text-center px-2">{message}</p>
        </div>
    )
}

export default Spinner
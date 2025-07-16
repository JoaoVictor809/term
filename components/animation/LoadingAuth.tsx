import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const App = () => {
    return (
        <div className='flex w-[100%] h-[100vh] justify-center items-center'>
            <DotLottieReact
                src="https://lottie.host/b3cb4991-759b-4880-a107-4d62c777b5b3/91DuaYA2jd.lottie"
                loop
                autoplay
            />
        </div>
    );
};

export default App

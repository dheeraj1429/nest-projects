import React from 'react';
import { Props } from '.';

function CustomButton({ text, type }: Props) {
   return (
      <button
         type={type}
         className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
         {text}
      </button>
   );
}

export default CustomButton;

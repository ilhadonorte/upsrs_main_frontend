

import {type ReactNode}  from 'react';

interface Props {
  children: ReactNode;
}

export default function submitButton({children}: Props){

    return (
    <button
        type="submit"
        className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
        {children}
    </button>
)
} 
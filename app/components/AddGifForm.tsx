'use client';

import React, { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react';
import useProgram from '../hooks/useProgram';

function AddGifForm() {
  const [inputValue, setInputValue] = useState('');
  const { addGif } = useProgram()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.length === 0) {
      console.log('Empty input. Try again');
      return;
    }

    console.log(`submit new gif: ${inputValue}`);

    setInputValue('');

    await addGif(inputValue);
  };

  return (
    <form className="my-4" onSubmit={onSubmit}>
      <input
        className="px-3 py-2 rounded-l-2xl"
        type="text"
        placeholder="Enter gif link here"
        value={inputValue}
        onChange={onChange}
      />
      <button
        className={`px-3 py-2 rounded-r-2xl uppercase ${inputValue.length === 0 ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-700'}`}
        type="submit"
        disabled={inputValue.length === 0}
      >
        Submit
      </button>
    </form>
  )
}

export default AddGifForm
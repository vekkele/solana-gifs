'use client';

import React, { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react';

function AddGifForm() {
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.length === 0) {
      console.log('Empty input. Try again');
      return;
    }

    console.log(`submit new gif: ${inputValue}`);
  };

  return (
    <form className="my-4" onSubmit={onSubmit}>
      <input
        className="px-2 py-1 rounded-sm"
        type="text"
        placeholder="Enter gif link here"
        value={inputValue}
        onChange={onChange}
      />
      <button
        className={`px-2 py-1 rounded-md ml-2 ${inputValue.length === 0 ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-700'}`}
        type="submit"
        disabled={inputValue.length === 0}
      >
        Submit
      </button>
    </form>
  )
}

export default AddGifForm
import { useState } from 'react';
import * as React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { register } from './usersThunk.ts';
import FileInput from '../../components/FileInput/FileInput.tsx';

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const initialState = {
  email: '',
  password: '',
  image: '',
  displayName: ''
};

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const [errors, setErrors] = useState<{email?: string}>({});
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));

    if(name === 'email') {
      if(regEmail.test(value)) {
        setErrors(prev => ({...prev, email: ''}));
      } else {
        setErrors(prev => ({...prev, email: 'Invalid email format'}));
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
    try {
      await dispatch(register(form)).unwrap();
      navigate('/');

      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const getFiledError = (fieldName: string) => {
    try {
      return registerError?.errors?.[fieldName]?.message || '';
    } catch (e) {
      return e;
    }
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={onSubmit}>
          <h3 className="text-2xl font-semibold text-center mb-5">Sign Up</h3>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={inputChange}
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                getFiledError('email') || errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email"
            />
            {getFiledError('email') && (
              <p className="text-red-500 text-sm mt-1">{getFiledError('email') || errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={inputChange}
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                getFiledError('password') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Password"
            />
            {getFiledError('password') && (
              <p className="text-red-500 text-sm mt-1">{getFiledError('password')}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700 font-medium">Display Name</label>
            <input
              id="displayName"
              name="displayName"
              value={form.displayName}
              onChange={inputChange}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Display Name"
            />
          </div>

          <div className="mb-4">
            <FileInput name="image" label="Image" onGetFile={getImage}/>
          </div>

          <button type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>

          <p className="text-center mt-3">
            <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Sign in</Link>
          </p>
        </form>
      </div>

    </>
  );
};

export default RegisterPage;
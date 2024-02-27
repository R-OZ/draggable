import React, { useState } from 'react'
import Header from './header'
import Buttons from './buttons';
import { FormInput, FormSelect } from './formElements';
import Notification from './notification';
import { v4 as uuidv4 } from 'uuid'
import { addEmployee, updateEmployee } from '../api/employee';
import { getAddCount, getUpdateCount } from '../api/count';

const Employees = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [addCountValue, setAddCountValue] = useState(null);
  const [updateCountValue, setUpdateCountValue] = useState(null)

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [formError, setFormError] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'firstName' || name === 'lastName') {
      if (!value.trim().match(/^[a-zA-Z]+$/)) {
        error = 'Name must contain only alphabetical characters';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters long';
      }
    }
    else if (name == 'role'){
      if (!value.trim()) {
        error = 'Cannot have empty input';
      }
    }
    setFormError({
      ...formError,
      [name]: error,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!formData.id){
      setIsLoading(true)
      try {
        let newFromData = {...formData, id: uuidv4()}
        setFormData(newFromData)
        const res = await addEmployee(newFromData);
        const addCount = await getAddCount();
        setAddCountValue(addCount.count)
        setResponse(res.message)
        console.log(res)
      } catch (error) {
        console.error('Error adding employee:', error.message);
        setError(error.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    else{
      setFormData({id: '', firstName: '', lastName: '', email: '', role: ''})
    }
  }

  const handleUpdateEmployee = async (e) => {
    setIsLoading(true)
    try {
      const res = await updateEmployee(formData.id, formData);
      const updateCount = await getUpdateCount();
      setUpdateCountValue(updateCount.count);
      setResponse(res.message)
      console.log(res)
    } catch (error) {
      console.error('Error updating employee:', error.message);
      setError(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  const closeNotification =()=>{
    setError(null);
    setResponse(null);
    setAddCountValue(null);
    setUpdateCountValue(null);
  }

  return (
    isLoading ?
      <div className="loading">Loading...</div> 
    :
      <div className='component'>
          <Header color={'rgb(94, 94, 177'}>Employee Form</Header>
          <form className='form-container' onSubmit={null}>
            <input type="text" name='id' placeholder='ID' value={formData.id} onChange={handleChange} className='form-id-input' />
            <FormInput name={'firstName'} text={'First Name'} onChange={handleChange} value={formData.firstName} type={'text'} placeholder={'John'} error={formError.firstName} />
            <FormInput name={'lastName'} text={'Last Name'} onChange={handleChange} value={formData.lastName} type={'text'} placeholder={'Doe'} error={formError.lastName} />
            <FormInput name={'email'} text={'Employee Email'} onChange={handleChange} value={formData.email} type={'email'} placeholder={'johndoe@example.com'} error={formError.email} />
            <FormSelect 
              name={'role'} 
              text={'Employee Role'}
              options={['Sales', 'Customer Support', 'Engineer', 'Intern']}
              initialValue={''}
              value={formData.role} 
              onChange={handleChange} 
              error={formError.role} 
            />

            <Buttons id={formData.id} addFunc={handleAddEmployee} updateFunc={handleUpdateEmployee} />       

          </form>

          <Notification error={error} response={response} closeNotification={closeNotification} addCount={addCountValue} updateCount={updateCountValue} />
      </div>
  )
}

export default Employees
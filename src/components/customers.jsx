import React, {useState} from 'react'
import Header from './header'
import Buttons from './buttons'
import { FormInput } from './formElements';
import { v4 as uuidv4 } from 'uuid'
import Notification from './notification';
import { addCustomer, updateCustomer } from '../api/customer';
import { getAddCount, getUpdateCount } from '../api/count';


const Customers = () => {
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
  });

  const [formError, setFormError] = useState({
    fname: '',
    lastName: '',
    email: '',
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
  
    setFormError({
      ...formError,
      [name]: error,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!formData.id){
      setIsLoading(true)
      try {
        let newFromData = {...formData, id: uuidv4()}
        setFormData(newFromData)
        const res = await addCustomer(newFromData);
        const addCount = await getAddCount();
        setAddCountValue(addCount.count)
        setResponse(res.message)
        console.log(res)
      } catch (error) {
        console.error('Error adding customer:', error.message);
        setError(error.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    else{
      setFormData({id: '', firstName: '', lastName: '', email: ''})
    }
  }
  
  const handleUpdateCustomer = async (e) => {
    setIsLoading(true)
    try {
      const res = await updateCustomer(formData.id, formData);
      const updateCount = await getUpdateCount();
      setUpdateCountValue(updateCount.count);
      setResponse(res.message)
      console.log(res)
    } catch (error) {
      console.error('Error updating customer:', error.message);
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
          <Header>Customer Form</Header>
          <form className='form-container' onSubmit={null}>
            <input type="text" name='id' placeholder='ID' value={formData.id} onChange={handleChange} className='form-id-input' />
            <FormInput name={'firstName'} text={'First Name'} type={'text'} placeholder={'John'} value={formData.firstName} onChange={handleChange} error={formError.firstName} />
            <FormInput name={'lastName'} text={'Last Name'} type={'text'} placeholder={'Doe'} value={formData.lastName} onChange={handleChange} error={formError.lastName} />
            <FormInput name={'email'} text={'Email'} type={'email'} placeholder={'johndoe@example.com'} value={formData.email} onChange={handleChange} error={formError.email} />

            <Buttons id={formData.id} addFunc={handleAddCustomer} updateFunc={handleUpdateCustomer} />
          </form>

          <Notification error={error} response={response} closeNotification={closeNotification} addCount={addCountValue} updateCount={updateCountValue}  />
      </div>
  )
}

export default Customers
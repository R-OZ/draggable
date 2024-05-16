import React, { useState } from 'react'
import Header from './header'
import Buttons from './buttons';
import { addCar, updateCar } from '../api/car';
import { v4 as uuidv4 } from 'uuid'
import Notification from './notification';
import { FormSelect } from './formElements';
import { getAddCount, getUpdateCount } from '../api/count';


const carMake = [ "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Ferrari", "Bugatti", "Audi", "Volkswagen", "Subaru", "Hyundai", "Porsche"];
const carType = ["Sedan", "SUV", "Truck", "Hatchback", "Coupe", "Convertible", "Minivan", "Wagon", "Crossover"];
const carCondition = ['New', 'Used'];
const carYear = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', 'Other'];

const Cars = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [addCountValue, setAddCountValue] = useState(null);
  const [updateCountValue, setUpdateCountValue] = useState(null)

  const [formData, setFormData] = useState({
    id: '',
    make: '',
    type: '',
    condition: '',
    yearMade: '',
  });

  const [formError, setFormError] = useState({
    id: '',
    make: '',
    type: '',
    condition: '',
    yearMade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
  
    if (!value.trim()) {
      error = 'Cannot have empty input';
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

  const handleAddCar = async (e) => {
    e.preventDefault();
    if (!formData.id){
      setIsLoading(true)
      try {
        let newFromData = {...formData, id: uuidv4()}
        setFormData(newFromData)
        const res = await addCar(newFromData);
        const addCount = await getAddCount();
        setAddCountValue(addCount.count)
        setResponse(res.message)
        console.log(res)
      } catch (error) {
        console.error('Error adding car:', error.message);
        setError(error.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    else{
      setFormData({id: '', make: '', type: '', condition: '', yearMade: ''})
    }
  };

  const handleUpdateCar = async (e) => {
    setIsLoading(true)
    try {
      const res = await updateCar(formData.id, formData);
      const updateCount = await getUpdateCount();
      setUpdateCountValue(updateCount.count);
      setResponse(res.message)
      console.log(res)
    } catch (error) {
      console.error('Error updating car:', error.message);
      setError(error.message)
    }
    finally{
      setIsLoading(false)
    }
  };

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
        <Header color={'rgb(196, 60, 60)'}>Vehicle Form</Header>
        <form className='form-container'>
          <input type="text" name='id' placeholder='ID' value={formData.id} onChange={handleChange} className='form-id-input' />
          <FormSelect 
            name={'make'} 
            text={'Make'}
            options={carMake}
            initialValue={''}
            onChange={handleChange}
            value={formData.make}
            error={formError.make}
          />
          <FormSelect 
            name={'type'} 
            text={'Type'}
            options={carType}
            initialValue={''}
            value={formData.type}
            onChange={handleChange}
            error={formError.type}
          />
          <div style={{display: 'flex', gap: '15px'}}>
            <FormSelect 
              name={'condition'} 
              text={'Condition'}
              options={carCondition}
              initialValue={''}
              value={formData.condition}
              onChange={handleChange}
              error={formError.condition}
            />
            <FormSelect 
              name={'yearMade'} 
              text={'Year Made'}
              options={carYear}
              initialValue={''}
              value={formData.yearMade}
              onChange={handleChange}
              error={formError.yearMade}
            />
          </div>

          <Buttons id={formData.id} addFunc={handleAddCar} updateFunc={handleUpdateCar} />          

        </form>

        <Notification error={error} response={response} addCount={addCountValue} updateCount={updateCountValue} closeNotification={closeNotification} />
      </div>
  )
}

export default Cars
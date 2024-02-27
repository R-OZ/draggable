export const FormInput = ({name, text, type, placeholder, value, onChange, error}) =>{
    return (
      <div className='form-input-container'>
        <label style={{display: 'block', fontSize:'15px', marginBottom:'5px'}} htmlFor={name}>
          {text}
        </label>
        <input className='form-input' name={name} id={name} value={value} onChange={onChange} required type={type} placeholder={placeholder} />
        {error&& <span style={{color: 'red', fontSize:'12px', fontWeight: 500}}>{error}</span>}
      </div>
  
    )
  }
  
export const FormSelect = ({name, text, options, initialValue, value, onChange, error}) =>{
    return (
        <div className='form-input-container'>
        <label style={{display: 'block', marginBottom:'5px'}} htmlFor={name}>
            {text}
        </label>
        <select value={value} onChange={onChange} required name={name} id={name} className='form-input'>
            <option value="">{initialValue}</option>
            {
                options.map((item, idx)=>(
                    <option value={item.toLowerCase()} key={idx}>
                        {item}
                    </option>
                ))
            }
        </select>
        {error&& <span style={{color: 'red', fontSize:'12px', fontWeight: 500}}>{error}</span>}
        </div>
    )
}
  
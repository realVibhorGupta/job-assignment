
const Textbox = ({ type = "text", name, placeholder, value, onChange, className = "", required = false }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full mb-4 p-2 border border-gray-300 rounded ${className}`}

      />
    );
  };
  
export default Textbox

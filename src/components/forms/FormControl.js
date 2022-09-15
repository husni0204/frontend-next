import PropTypes from 'prop-types'

const FormControl = ({ children, label, id }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            {children}
        </div>
    )
}

FormControl.propTypes = {}

export default FormControl
import Button from '../forms/Button'
import FormControl from '../forms/FormControl'
import Input from '../forms/Input'

const Form = ({ formik }) => {
    return (
        <div className="w-full shadow-md rounded mb-4">
            <form onSubmit={formik.handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="Input Book Name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['name']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Description" id="description">
                    <Input
                        placeholder="Input Book Description"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['description']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Price" id="price">
                    <Input
                        placeholder="Input Book Price"
                        id="price"
                        type="number"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['price']}
                        </label>
                    )}
                </FormControl>

                <Button
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}>
                    {formik.values.id ? 'Update' : 'Submit'}
                </Button>
            </form>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </div>
    )
}

Form.propTypes = {}

export default Form

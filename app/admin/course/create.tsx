import { SimpleForm, Create, TextInput, required } from "react-admin"

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm  >
        <TextInput source='title' validate={[required()]} label='Title' />
        <TextInput source='imageSrc' validate={[required()]} label='Image Src' />
      </SimpleForm>
    </Create>
  )
}

export default CourseCreate
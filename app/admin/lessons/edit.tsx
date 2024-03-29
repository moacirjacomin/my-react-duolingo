import { SimpleForm, TextInput, required, Edit, NumberInput, ReferenceInput } from "react-admin"

const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="Title"
        />
        <ReferenceInput
          source="unitId"
          reference="units"
        />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Edit>
  )
}

export default LessonEdit
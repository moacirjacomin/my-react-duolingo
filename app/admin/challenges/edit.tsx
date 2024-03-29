import { SimpleForm, TextInput, required, Edit, NumberInput, ReferenceInput, SelectInput } from "react-admin"

const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput 
          source="question" 
          validate={[required()]} 
          label="Question"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            }
          ]}
          validate={[required()]} 
        />
        <ReferenceInput
          source="lessonId"
          reference="lessons"
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

export default ChallengeEdit
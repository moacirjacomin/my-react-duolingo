import { SimpleForm, Create, TextInput, required, ReferenceInput, NumberInput, SelectInput } from "react-admin"

const ChallengeCreate = () => {
  return (
    <Create>
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
    </Create>
  )
}

export default ChallengeCreate
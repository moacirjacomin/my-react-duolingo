import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin"

const LessonList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  )
}

export default LessonList
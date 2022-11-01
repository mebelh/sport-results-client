import React from 'react';
import { Form } from 'app/form';
import Input from 'components/input';

const form = new Form(
  [
    {
      validate: [],
      name: 'email',
    },
  ],
  {}
);

const CreateExercisePage: React.FC = () => {
  console.log('asd');

  return (
    <div>
      <form onSubmit={form.onSubmit}>
        <Input {...form.fields} />
      </form>
    </div>
  );
};

export default CreateExercisePage;

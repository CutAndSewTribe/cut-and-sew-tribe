import InstructorPage from '@/components/instructor/layout/InstructorPage';
import PatternForm from '@/components/instructor/patterns/PatternForm';
import { createPatternAction } from '../actions';

export default function NewPatternPage() {
return ( <InstructorPage
   title='Create Pattern'
   description='Write a new pattern drafting article and connect it to your course ecosystem.'
 > <PatternForm action={createPatternAction} /> </InstructorPage>
);
}

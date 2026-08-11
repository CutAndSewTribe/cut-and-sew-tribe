import { notFound } from 'next/navigation';
import InstructorPage from '@/components/instructor/layout/InstructorPage';
import PatternForm from '@/components/instructor/patterns/PatternForm';
import { getPatternById } from '@/lib/patterns';
import { updatePatternAction } from '../../actions';

export default async function EditPatternPage({
params,
}: {
params: Promise<{ patternId: string }>;
}) {
const { patternId } = await params;
const pattern = await getPatternById(patternId);

if (!pattern) notFound();

return ( <InstructorPage
   title='Edit Pattern'
   description='Update the article, SEO, media, and publishing settings.'
 >
<PatternForm
initialValues={pattern}
action={updatePatternAction.bind(null, patternId)}
/> </InstructorPage>
);
}

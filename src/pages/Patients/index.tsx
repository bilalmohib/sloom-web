import { Heading1, Paragraph } from '@/components/common/Typography';

const Patients = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <Heading1>Patients</Heading1>
      <Paragraph className="text-muted-foreground! mt-2">
        Patient list coming soon.
      </Paragraph>
    </div>
  );
};
export default Patients;
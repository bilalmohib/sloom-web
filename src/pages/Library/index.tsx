import { Heading1, Paragraph } from '@/components/common/Typography';

const Library = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <Heading1>Library</Heading1>
      <Paragraph className="text-muted-foreground! mt-2">
        Your recordings will appear here.
      </Paragraph>
    </div>
  );
};

export default Library;

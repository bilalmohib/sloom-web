import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heading2, Paragraph } from '@/components/common/Typography';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return (
    <div className="my-auto flex min-w-[600px] flex-col items-center justify-center gap-8 rounded-[8px] bg-white px-5 py-20 shadow-[0_2px_6px_0_rgba(16,24,40,0.06)]">
      <div className="flex flex-col gap-1">
        <Heading2 className="text-input-text! tracking-[-0.92px]! leading-normal md:leading-13.75!">
          Satori Clinical
        </Heading2>

        <Paragraph className="text-input-text! md:text-base! lg:text-base!">
          Secure access for pediatric clinicians{' '}
        </Paragraph>
      </div>

      <div className="w-97.5">
        <Input
          placeholder="Enter your email"
          className="w-full!"
          inputClassName="w-full! h-10! py-2! px-3! rounded-[8px]!"
          label="Email"
          labelClassName="text-input-text! md:text-base! lg:text-base! leading-normal! tracking-[-0.92px]!"
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <Button
        className="w-97.5 h-10! py-2.5! px-4!"
        onClick={() => {
          signIn();
          navigate('/patients');
        }}
      >
        Send Magic Link
      </Button>
    </div>
  );
};

export default LoginForm;

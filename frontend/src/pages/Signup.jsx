import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Signup</h1>
      <SignupForm />
    </div>
  );
};

export default Signup
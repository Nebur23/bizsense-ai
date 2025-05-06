import MyForm from "./form";


const Page = () => {
  
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='max-w-xl w-full flex flex-col mx-auto justify-center items-center'>
        <h1 className='font-geist-sans text-3xl font-semibold'>
          Business Details
        </h1>
        <MyForm />
      </div>
    </div>
  );
};

export default Page;

import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

import { Card } from "./ui/card";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <div className='total-balance'>
      <div className='flex size-full max-w-[100px] items-center sm:max-w-[120px]'>
        <DoughnutChart accounts={accounts} />
      </div>

      <div className='flex flex-col gap-6'>
        <h2 className='text-18 font-semibold text-gray-900'>
          Bank Accounts: {totalBanks}
        </h2>
        <div className='flex flex-col gap-2'>
          <p className='text-14 font-medium text-gray-600'>
            Total Current Balance
          </p>

          <div className='text-24 lg:text-30 flex-1 font-semibold text-gray-900 flex-center gap-2'>
            <AnimatedCounter suffix=" FCFA" amount={totalCurrentBalance}   />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceBox;

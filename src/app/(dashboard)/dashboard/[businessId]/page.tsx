import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getFirstName } from "@/lib/utils";

export default async function Dashbord() {
  const name = "user";
  const user = getFirstName(name);
  return (
    <section className='no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll '>
      <div className='no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll '>
        <header className='flex flex-col justify-between gap-8'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            subtext='Access and manage your account and transactions efficiently'
            user={user}
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={20000}
          />
        </header>
        RECENT TRANSACTIONS
        {/* <AccountSelector
          totalAmount={25000}
          onChange={value => console.log(value)}
        /> */}
      </div>
    </section>
  );
}

import { ComponentProps, useState } from 'react';
import { cn } from './utils/cn';

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

const getZodiacSign = async (day: number, month: number) => {
  const response = await fetch(`${DOMAIN}/${day}/${month}`);
  const data = await response.json();
  return data.sign;
};

const Day = ({ dayValue, ...props }: ComponentProps<'div'> & { dayValue: string }) => {
  return <div {...props}>{dayValue}</div>;
};
const Month = ({ monthValue, ...props }: ComponentProps<'div'> & { monthValue: string }) => {
  return <div {...props}>{monthValue}</div>;
};
const AllDays = ({ day, setDay }: { day: string; setDay: (d: string) => void }) => {
  const days = Array.from({ length: 31 }, (_, i) => {
    if (i < 9) {
      return '0' + (i + 1).toString();
    } else {
      return (i + 1).toString();
    }
  });
  return (
    <div>
        <div className='py-4 text-left'>
      <h3 className='text-xl '>Dia</h3>
      <p>Seleccione el dia de su Nacimiento</p>
        </div>
      <div className='flex flex-wrap gap-2'>
        {days.map((d) => {
          return (
            <Day
              onClick={() => setDay(d)}
              className={cn(
                'bg-gray-100 p-2 w-10 h-10 rounded-md flex-shrink-0 cursor-pointer hover:border-blue-600 border',
                {
                  'bg-blue-700 text-white': d === day
                }
              )}
              key={d}
              dayValue={d}
            />
          );
        })}
      </div>
    </div>
  );
};
const MESES: { [key: number]: string } = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
};

const AllMonths = ({ month, setMonth }: { month: string; setMonth: (d: string) => void }) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    if (i < 9) {
      return '0' + (i + 1).toString();
    } else {
      return (i + 1).toString();
    }
  });
  return (
    <div>
        <div className='py-4 text-left'>
      <h3 className='text-xl '>Mes</h3>
      <p>Seleccione el mes de su Nacimiento</p>
        </div>
      <div className='flex flex-wrap gap-2'>
        {months.map((m) => {
          const monthValue = MESES[parseInt(m)]
          return (
            <Month
              onClick={() => setMonth(m)}
              className={cn(
                'bg-gray-100 p-2 h-10 rounded-md flex-shrink-0 cursor-pointer hover:border-blue-600 border w-fit',
                {
                  'bg-blue-700 text-white': m === month
                }
              )}
              key={m}
              monthValue={monthValue}
            />
          );
        })}
      </div>
    </div>
  );
};

const App = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [sign, setSign] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (day: number, month: number) => {
      try{
        setLoading(true);
        const response = await getZodiacSign(day, month);
        setTimeout(()=>{
            setSign(response);
            setLoading(false);
        },500)
        }catch(e){
            setSign('Fecha invalida');
            console.log(e);
            setLoading(false);
        }
  };

  return (
    <div className='w-full h-screen overflow-hidden bg-slate-50'>
      <div className='max-w-screen-sm mx-auto sm:mt-[4rem] text-center bg-white p-8 shadow-xl'>
        <h1 className='pt-8 text-2xl font-semibold upp'>Tu Signo Zodiacal</h1>
        <div className='space-y-4'>
          <AllDays day={day} setDay={setDay} />
          {/* <input
            className='block w-full px-4 py-2 border rounded-md border-slate-600'
            disabled={loading}
            type='number'
            placeholder='Day'
            value={day}
            onChange={(e) => setDay(e.target.value)}
          /> */}
          <AllMonths month={month} setMonth={setMonth} />
          {/* <input
            className='block w-full px-4 py-2 border rounded-md border-slate-600'
            disabled={loading}
            type='number'
            placeholder='Month'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          /> */}
          <button
            disabled={loading}
            className='w-full px-4 py-2 text-white bg-blue-700 rounded-md'
            onClick={() => handleSubmit(parseInt(day), parseInt(month))}
          >
            Submit
          </button>
        </div>
      </div>
      <div className='max-w-screen-sm mx-auto font-semibold text-center'>
      {loading ? <h1 className='p-8 text-2xl'>Loading...</h1> : <h1 className='p-8 text-2xl'>{sign}</h1>}
      </div>
    </div>
  );
};
export default App;

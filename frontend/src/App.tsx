import { ComponentProps, useState } from 'react';
import { cn } from './utils/cn';

const getZodiacSign = async (day: number, month: number) => {
  const response = await fetch(`http://localhost:3000/${day}/${month}`);
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
  const days = Array.from({ length: 31 }, (v, i) => {
    if (i < 9) {
      return '0' + (i + 1).toString();
    } else {
      return (i + 1).toString();
    }
  });
  return (
    <div>
        <div className='text-left py-4'>
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
const MESES = {
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
  const months = Array.from({ length: 12 }, (v, i) => {
    if (i < 9) {
      return '0' + (i + 1).toString();
    } else {
      return (i + 1).toString();
    }
  });
  return (
    <div>
        <div className='text-left py-4'>
      <h3 className='text-xl '>Mes</h3>
      <p>Seleccione el mes de su Nacimiento</p>
        </div>
      <div className='flex flex-wrap gap-2'>
        {months.map((m) => {
          return (
            <Month
              onClick={() => setMonth(m)}
              className={cn(
                'bg-gray-100 p-2 w-10 h-10 rounded-md flex-shrink-0 cursor-pointer hover:border-blue-600 border w-fit',
                {
                  'bg-blue-700 text-white': m === month
                }
              )}
              key={m}
              monthValue={MESES[parseInt(m)]}
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
        <h1 className='text-2xl font-semibold upp pt-8'>Tu Signo Zodiacal</h1>
        <div className='space-y-4'>
          <AllDays day={day} setDay={setDay} />
          {/* <input
            className='block px-4 py-2 w-full border border-slate-600 rounded-md'
            disabled={loading}
            type='number'
            placeholder='Day'
            value={day}
            onChange={(e) => setDay(e.target.value)}
          /> */}
          <AllMonths month={month} setMonth={setMonth} />
          {/* <input
            className='block px-4 py-2 w-full border border-slate-600 rounded-md'
            disabled={loading}
            type='number'
            placeholder='Month'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          /> */}
          <button
            disabled={loading}
            className='px-4 py-2 bg-blue-700 text-white w-full rounded-md'
            onClick={() => handleSubmit(parseInt(day), parseInt(month))}
          >
            Submit
          </button>
        </div>
      </div>
      <div className='font-semibold max-w-screen-sm mx-auto text-center'>
      {loading ? <h1 className='text-2xl p-8'>Loading...</h1> : <h1 className='text-2xl p-8'>{sign}</h1>}
      </div>
    </div>
  );
};
export default App;

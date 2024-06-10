import express from 'express';
import cors from 'cors';
import { getZodiacSign } from './service';

const app = express();
app.use(cors())
app.use(express.json());

app.get('/:day/:month', (req, res) => {
  try {
    const day = req.params.day;
    const month = req.params.month;
    const zodiacSign = getZodiacSign(parseInt(day), parseInt(month));
    if (zodiacSign) {
      res.status(200).json({ sign: zodiacSign })
    } else {
      res.status(400).send('Fecha inválida');
    }
  } catch (e) {
    res.status(400).send('Fecha inválida');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

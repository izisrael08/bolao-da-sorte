import { motion } from 'framer-motion';
import img01 from '../assets/images/01.jpg';
import img02 from '../assets/images/02.jpg';
import img03 from '../assets/images/03.jpg';
import img04 from '../assets/images/04.jpg';
import img05 from '../assets/images/05.jpg';
import img06 from '../assets/images/06.jpg';
import img07 from '../assets/images/07.jpg';
import img08 from '../assets/images/08.jpg';
import img09 from '../assets/images/09.jpg';
import img10 from '../assets/images/10.jpg';
import img11 from '../assets/images/11.jpg';
import img12 from '../assets/images/12.jpg';
import img13 from '../assets/images/13.jpg';
import img14 from '../assets/images/14.jpg';
import img15 from '../assets/images/15.jpg';
import img16 from '../assets/images/16.jpg';
import img17 from '../assets/images/17.jpg';
import img18 from '../assets/images/18.jpg';
import img19 from '../assets/images/19.jpg';
import img20 from '../assets/images/20.jpg';
import img21 from '../assets/images/21.jpg';
import img22 from '../assets/images/22.jpg';
import img23 from '../assets/images/23.jpg';
import img24 from '../assets/images/24.jpg';
import img25 from '../assets/images/25.jpg';
import '../styles/SectionPalpites/index.css';

// Mapeamento de grupos para animais e suas imagens
const grupoToAnimal = {
  '01': { animal: 'Avestruz', imgSrc: img01 },
  '02': { animal: 'Águia', imgSrc: img02 },
  '03': { animal: 'Burro', imgSrc: img03 },
  '04': { animal: 'Borboleta', imgSrc: img04 },
  '05': { animal: 'Cachorro', imgSrc: img05 },
  '06': { animal: 'Cabra', imgSrc: img06 },
  '07': { animal: 'Carneiro', imgSrc: img07 },
  '08': { animal: 'Camelo', imgSrc: img08 },
  '09': { animal: 'Cobra', imgSrc: img09 },
  '10': { animal: 'Coelho', imgSrc: img10 },
  '11': { animal: 'Cavalo', imgSrc: img11 },
  '12': { animal: 'Elefante', imgSrc: img12 },
  '13': { animal: 'Galo', imgSrc: img13 },
  '14': { animal: 'Gato', imgSrc: img14 },
  '15': { animal: 'Jacaré', imgSrc: img15 },
  '16': { animal: 'Leão', imgSrc: img16 },
  '17': { animal: 'Macaco', imgSrc: img17 },
  '18': { animal: 'Porco', imgSrc: img18 },
  '19': { animal: 'Pavão', imgSrc: img19 },
  '20': { animal: 'Peru', imgSrc: img20 },
  '21': { animal: 'Touro', imgSrc: img21 },
  '22': { animal: 'Tigre', imgSrc: img22 },
  '23': { animal: 'Urso', imgSrc: img23 },
  '24': { animal: 'Veado', imgSrc: img24 },
  '25': { animal: 'Vaca', imgSrc: img25 },
};

export default function PalpitesSemana() {
  const palpites = [
    { grupo: '01', milhar: 'Milhar: 0191-1211-1212-1212', centena: 'Centena: 123-323-232-2323' },
    { grupo: '02', milhar: 'Milhar: 2231-1111-2321-3321', centena: 'Centena: 132-313-331-3133' },
    { grupo: '03', milhar: 'Milhar: 3232-4332-5232-6232', centena: 'Centena: 223-212-232-202' },
    { grupo: '04', milhar: 'Milhar: 8282-9292-2222-1111', centena: 'Centena: 888-999-000-111' },
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR');

  return (
    <motion.section
      id="palpites"
      className="palpites-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Palpite do Dia {formattedDate}</h2>
      <div className="palpites-grid">
        {palpites.map((palpite, index) => {
          const { animal, imgSrc } = grupoToAnimal[palpite.grupo];
          return (
            <motion.div
              key={index}
              className="palpite-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="palpite-header">
                <span className="grupo-texto">{`Grupo: ${palpite.grupo}`}</span>
                <span className="animal-texto">{animal}</span>
              </div>
              <div className="palpite-texto">
                <p>{palpite.milhar}</p>
                <p>{palpite.centena}</p>
              </div>
              <img src={imgSrc} alt={animal} className="palpite-img" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

import { motion } from 'framer-motion';

export default function PalpitesSemana() {
  const palpites = [
    { dia: 'Segunda', numeros: ['12', '34', '56', '78'] },
    { dia: 'Terça', numeros: ['23', '45', '67', '89'] },
    { dia: 'Quarta', numeros: ['11', '22', '33', '44'] },
    { dia: 'Quinta', numeros: ['55', '66', '77', '88'] },
    { dia: 'Sexta', numeros: ['10', '20', '30', '40'] },
    { dia: 'Sábado', numeros: ['15', '25', '35', '45'] },
    { dia: 'Domingo', numeros: ['50', '60', '70', '80'] }
  ];

  return (
    <motion.section 
      id="palpites"
      className="palpites-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Palpites da Semana - Gerente Edilson</h2>
      <div className="palpites-grid">
        {palpites.map((palpite, index) => (
          <motion.div 
            key={index}
            className="palpite-card"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h3>{palpite.dia}</h3>
            <div className="numeros-container">
              {palpite.numeros.map((numero, numIndex) => (
                <span key={numIndex} className="numero-bola">{numero}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
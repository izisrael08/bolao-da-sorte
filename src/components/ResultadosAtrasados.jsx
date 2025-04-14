import { motion } from 'framer-motion';
import '../styles/global.css';

export default function ResultadosAtrasados() {
  const resultados = [
    { data: '01/01/2023', numeros: ['1234', 'Animal: Vaca', 'Premiação: R$ 1.000,00'] },
    { data: '02/01/2023', numeros: ['5678', 'Animal: Galo', 'Premiação: R$ 800,00'] },
    { data: '03/01/2023', numeros: ['9012', 'Animal: Coelho', 'Premiação: R$ 1.200,00'] },
    { data: '04/01/2023', numeros: ['3456', 'Animal: Leão', 'Premiação: R$ 1.500,00'] }
  ];

  return (
    <motion.section 
      id="resultados"
      className="resultados-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Resultados Atrasados - Jogo do Bicho</h2>
      <div className="resultados-table">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Número</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <motion.tr 
                key={index}
                whileHover={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
              >
                <td>{resultado.data}</td>
                <td>{resultado.numeros[0]}</td>
                <td>
                  <div>{resultado.numeros[1]}</div>
                  <div>{resultado.numeros[2]}</div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
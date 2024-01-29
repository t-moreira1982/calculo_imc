import { useState } from 'react';
import styles from './Formulario.module.css';

const Formulario = () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState('');
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [categoriaPeso, setCategoriaPeso] = useState('' );
    

    const calcularIMC = () => {
        if (peso > 1 && altura > 1) {
            const alturaMetros = altura / 100;
            const imc = peso / (alturaMetros * alturaMetros);
            setImc(imc.toFixed(2));
            setCategoriaPeso(obterCategoriaPeso(imc));
            setMostrarResultado(true);
            setPeso('');
            setAltura('');
        } else {
            setImc(null);
            setCategoriaPeso('');
            setMostrarResultado(false);
        }
    };

    const handleInputChange = () => {
        setMostrarResultado(false);
        setCategoriaPeso('');
    };

    const obterCategoriaPeso = (imc) => {
        let categoria = '';

        switch (true) {
            case imc >= 18.5 && imc <= 24.99:
            categoria = 'Peso Normal';
            break;
        case imc >= 25.00 && imc <= 29.99:
            categoria = 'Pré-Obesidade';
            break;
        case imc >= 30.00 && imc <= 34.99:
            categoria = 'Obesidade Grau I';
            break;
        case imc >= 35.00 && imc <= 39.99:
            categoria = 'Obesidade Grau II';
            break;
        case imc >= 40.00:
            categoria = 'Obesidade Grau III';
            break;
        default:
            categoria = 'Magreza';
            break; 
        }
        return categoria;
    };

    return (
        <>
            <form>
                <div className={styles.form}>
                    <label className={styles.label} htmlFor="">Peso</label>
                    <input className={styles.input} type="number" placeholder="Digite o peso em Kg" value={peso} onChange={(e) => {setPeso(e.target.value); handleInputChange()}}/>
                    <label className={styles.label} htmlFor="">Altura</label>
                    <input className={styles.input} type="number" placeholder="Digite a altura em cm" value={altura} onChange={(e) => {setAltura(e.target.value); handleInputChange()}} />
                    <button onClick={calcularIMC} className={styles.button} type="button">Calcular</button>
                </div>
            </form>

            {imc && mostrarResultado && (
                
                <div className={styles.resultado}>
                    <p className={styles.p}>Seu IMC é: <b className={styles.imc}>{imc}</b></p>
                    <p className={styles.categoria}>Sua categoria de peso é: <b className={styles.resCategoria}>{categoriaPeso}</b></p>

                </div>
            )}
        </>
    )



}

export default Formulario;
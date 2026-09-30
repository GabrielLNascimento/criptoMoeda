import styles from "./Home.module.css"
import { BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <form className={styles.formulario} >
                <input
                    type="text"
                    placeholder="Digite o nome da moeda... Ex bitcoin"
                />
                <button type="submit">
                    <BsSearch />
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">Valor Mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudança 24h</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-Label="Moeda">
                            <Link to={"/details/bitcoin"}>
                                <span>Bitcoin</span> | BTC
                            </Link>
                        </td>
                        <td className={styles.tdLabel} data-Label="Valor Mercado">
                            1T
                        </td>

                        <td className={styles.tdLabel} data-Label="Preço">
                            8.000
                        </td>

                        <td className={styles.tdLabel} data-Label="Volume">
                            2B
                        </td>

                        <td className={styles.tdLose} data-Label="Mudança 24h">
                            5%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Home;

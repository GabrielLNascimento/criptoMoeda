import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

interface CoinsProps {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
    status: string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
}

interface DataProps {
    data: CoinsProps[];
}

const Home = () => {
    const [input, setInput] = useState("");
    const [coins, setCoins] = useState<CoinsProps[]>([]);
    const [showMore, setShowMore] = useState(10);
    const navigate = useNavigate();
    console.log(showMore)
    useEffect(() => {
        async function getData() {
            fetch(
                `https://rest.coincap.io/v3/assets?limit=${showMore}&offset=0&apiKey=f43529e616bc49977c3dbad553ac4a4e3313f3bbd31f757fa202c2445f74672d`,
            )
                .then((response) => response.json())
                .then((json: DataProps) => {
                    const coinsData = json.data;

                    const price = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    });

                    const priceCompact = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                    });

                    const formatedResult = coinsData.map((item) => {
                        const formated = {
                            ...item,
                            formatedPrice: price.format(Number(item.priceUsd)),
                            formatedMarket: priceCompact.format(
                                Number(item.marketCapUsd),
                            ),
                            formatedVolume: priceCompact.format(
                                Number(item.volumeUsd24Hr),
                            ),
                        };

                        return formated;
                    });

                    setCoins(formatedResult);
                })
                .catch((err) => console.log(err));
        }

        getData();
    }, [showMore]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!input) return;
        navigate(`/details/${input}`);
    };

    return (
        <div>
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o nome da moeda... Ex bitcoin"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
                    {coins &&
                        coins.map((coin) => (
                            <tr className={styles.tr}>
                                <td
                                    className={styles.tdLabel}
                                    data-Label="Moeda"
                                >
                                    <Link to={"/details/bitcoin"}>
                                        <span>{coin.name}</span> | {coin.symbol}
                                    </Link>
                                </td>
                                <td
                                    className={styles.tdLabel}
                                    data-Label="Valor Mercado"
                                >
                                    {coin.formatedMarket}
                                </td>

                                <td
                                    className={styles.tdLabel}
                                    data-Label="Preço"
                                >
                                    {coin.formatedPrice}
                                </td>

                                <td
                                    className={styles.tdLabel}
                                    data-Label="Volume"
                                >
                                    {coin.formatedVolume}
                                </td>

                                <td
                                    className={
                                        Number(coin.changePercent24Hr) > 0
                                            ? styles.tdProfit
                                            : styles.tdLose
                                    }
                                    data-Label="Mudança 24h"
                                >
                                    {Number(coin.changePercent24Hr).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {coins && (
                <button
                    onClick={() => setShowMore(showMore + 10)}
                    className={styles.btnMore}
                >
                    Carregar Mais
                </button>
            )}
        </div>
    );
};

export default Home;

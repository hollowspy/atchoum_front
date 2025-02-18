import {useState} from "react";
import {Button, TextField} from "@mui/material";
import './Results.css'
import axios from "axios";




const Results = () => {
    const [email, setEmail] = useState('');
    const [isResultLoaded, setIsResultLoaded] = useState(false);
    const [resultByUser, setResultByUser] = useState(null);
    const [allResults, setAllResults] = useState(null);
    const [isAllowedToSeeAllResults, setIsAllowedToSeeAllResults] = useState(false);

    const onSubmitForm = async (e) => {
        console.log('inside On Submit Form');
        e.preventDefault();
        setIsResultLoaded(true)
        try {
            const url = 'https://api-concours-atchoum.onrender.com/result';
            //const url = 'http://localhost:8080/result';
            const body = { email }
            const result = await axios.post(url, body);
            setResultByUser(result.data.result);
            const urlCheckIsAllowed = 'https://api-concours-atchoum.onrender.com/see_results';
            //const urlCheckIsAllowed = 'http://localhost:8080/see_results';
            const checkIsAllowed = await axios.post(urlCheckIsAllowed, { id: result.data.result.id.toString()});
            setIsAllowedToSeeAllResults(checkIsAllowed.data.has_access_results_atchoum)
        } catch (e) {
            console.log('e', e);
            setResultByUser(null)
        }
    }

    const handleChangeInput = (e) => {
        setEmail(e.target.value)
    }

    const onSeeAllResults = async () => {
        try {
            const url = 'https://api-concours-atchoum.onrender.com/results';
            //const url = 'http://localhost:8080/results';
            const result = await axios.post(url);
            setAllResults(result.data.result)
        } catch (e) {
            setAllResults(null)
        }
    }


    return (
        <div>
            <h1>Résultat !!!</h1>
            <p>Tu as oublié ce que tu as mis comme réponse. Tu veux te rafraichir la mémoire ? Marque ton addresse mail que tu as utilisée alors</p>
            <form onSubmit={onSubmitForm} className="wrapperForm">
            <div className="subBlock">
                <h2>Ton addresse mail</h2>
                <div className="wrapperInput">
                    <TextField
                        onChange={(e) => handleChangeInput(e)}
                        required={true}
                        fullWidth={true}
                        name="email"
                        id="email"
                        label="email"
                        type="email"
                        variant="standard"
                        value={email}
                    />
                </div>
            </div>
            <div className="wrapperBtn">
                <Button  disabled={email === ''} type="submit" variant="contained">Valider</Button>
            </div>
            </form>
            {isResultLoaded && resultByUser?.id &&
                <div className="subBlock">
                    <table className="tableResult">
                        <thead>
                            <tr>
                                <td>Nom</td>
                                <td>Prenom</td>
                                <td>Genre</td>
                                <td>Poids</td>
                                <td>Taille</td>
                                <td>Prenom souhaité</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{resultByUser.last_name}</td>
                                <td>{resultByUser.first_name}</td>
                                <td>{resultByUser.gender}</td>
                                <td>{resultByUser.height}</td>
                                <td>{resultByUser.weight}</td>
                                <td>{resultByUser.atchoum_name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {isResultLoaded && !resultByUser?.id &&
               <p>Pas de donnée pour ce mail </p>
            }
            {isAllowedToSeeAllResults && resultByUser?.id &&
                <>
                <div className="wrapperBtn">
                    <Button onClick={onSeeAllResults} type="button" variant="contained">Voir tous les resultats</Button>
                </div>
                    {allResults &&
                        <div className="subBlock">
                        <table className="tableResult">
                            <thead>
                            <tr>
                                <td>Nom</td>
                                <td>Prenom</td>
                                <td>Genre</td>
                                <td>Poids</td>
                                <td>Taille</td>
                                <td>Prenom souhaité</td>
                            </tr>
                            </thead>
                            {allResults.map((res) => {
                                return (
                                    <tbody key={res.id}>
                                    <tr>
                                        <td>{res.last_name}</td>
                                        <td>{res.first_name}</td>
                                        <td>{res.gender}</td>
                                        <td>{res.height}</td>
                                        <td>{res.weight}</td>
                                        <td>{res.atchoum_name}</td>
                                    </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                        </div>
                    }
                </>

            }
        </div>
    )
};

export default Results
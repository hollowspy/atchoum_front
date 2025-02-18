import {
  Alert,
  Button, Dialog, DialogContent, DialogContentText, DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup, Snackbar,
  TextField
} from "@mui/material";

import {useState} from "react";
import axios from "axios";
import './Form.css'


const initForm = {
  lastName: '',
  firstName: '',
  email: '',
  gender: '',
  height: '',
  weight: '',
  gift: '',
  atchoumName: ''
}

const Form = () => {
  const [formAtchoum, setFormAtchoum] = useState(initForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const [displayErrorModal, setDisplayErrorModal] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);


  const onSubmitForm = async (e) => {
    e.preventDefault();
    setDisableBtn(true)
    try {
      const url = 'https://api-concours-atchoum.onrender.com/';
      //const url = 'http://localhost:8080';
      await axios.post(url, formAtchoum);
      setFormAtchoum(initForm)
      setIsSuccess(true)
    } catch (e) {
      if (e.response.status === 400 && e.response.data.code === 'ALREADY_DONE') {
        setDisplayErrorModal(true)
      }
    }
    setDisableBtn(false)
  }

  const handleChangeInput = (e) => {
    const copyForm = {...formAtchoum};
    copyForm[e.target.name] = e.target.value;
    setFormAtchoum(copyForm);
  }

  return (
    <>
      <div className="introForm">
        <p>Hello la compagnie ! Moi c’est Atchoum ! Petit être encore au chaud dans le ventre de maman ! Papa et maman
          étant joueurs, ils vous proposent ce petit concours !! A vous de découvrir mon sexe (je suis pudique , voyez vous !)
          et ma taille (pas celui de mon sexe, vous avez les idées bien mal placées !) ainsi que mon poids afin de gagner un lot que vous
          choisirez (mais qu’ils sont généreux mes parents !!). Le plus proche d'entre vous sera l'heureux gagnant !!</p>
        <p> Ah ! Et pour finir , celui qui trouvera mon prénom , se verra offrir une bouteille de champagne !
          Allez bonne chance les amis et à très vite !!</p>
      </div>

      <form onSubmit={onSubmitForm} className="wrapperForm">
        <div className="subBlock">
          <h2>Renseignements</h2>
          <div className="wrapperInput">
            <TextField
              onChange={(e) => handleChangeInput(e)}
              required={true}
              fullWidth={true}
              name="firstName"
              id="firstName"
              label="Prenom"
              variant="standard"
              value={formAtchoum.firstName}
            />
          </div>
          <div className="wrapperInput">
            <TextField
              onChange={(e) => handleChangeInput(e)}
              required={true}
              fullWidth={true}
              name="lastName"
              id="lastName"
              label="Nom"
              variant="standard"
              value={formAtchoum.lastName}
            />
          </div>
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
              value={formAtchoum.email}
            />
          </div>
        </div>
        <div className="subBlock">
          <h2>Sur Atchoum </h2>
          <div className="wrapperInput">
            <FormControl>
              <FormLabel>Sexe</FormLabel>
              <RadioGroup id="gender" name="gender" onChange={(e) => handleChangeInput(e)}>
                <FormControlLabel
                  value="girl"
                  control={<Radio checked={formAtchoum.gender === 'girl'} required={true} color="primary"/>}
                  label="Fille"/>
                <FormControlLabel
                  value="boy"
                  control={<Radio checked={formAtchoum.gender === 'boy'} required={true} color="primary"/>}
                  label="Garçon"/>
              </RadioGroup>
            </FormControl>
          </div>
          <div className="wrapperInput">
            <TextField
              onChange={(e) => handleChangeInput(e)}
              required={true}
              label="Taille"
              type="number"
              variant="standard"
              name="height"
              id="height"
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              value={formAtchoum.height}
            />
          </div>
          <div className="wrapperInput">
            <TextField
                onChange={(e) => handleChangeInput(e)}
                required={true}
                label="Poids"
                type="number"
                variant="standard"
                name="weight"
                id="weight"
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
                value={formAtchoum.weight}
            />
          </div>
          <h3>Cadeau souhaité</h3>
          <div className="wrapperInput">
            <FormControl>
              <RadioGroup id="gift" name="gift" onChange={(e) => handleChangeInput(e)}>
                <FormControlLabel
                  value="ham"
                  control={<Radio checked={formAtchoum.gift === 'ham'} required={true} color="primary"/>}
                  label="Un Jambon"/>
                <FormControlLabel
                  value="wine"
                  control={<Radio checked={formAtchoum.gift === 'wine'} required={true} color="primary"/>}
                  label="Une caisse de vin"/>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="subBlock">
          <h2>Bonus</h2>
          <p>Si vous avez le prénom (fille ou garçon), alors vous avez une bouteille de champagne offerte !!!</p>
          <div className="wrapperInput">
            <TextField
              onChange={(e) => handleChangeInput(e)}
              id="atchoumName"
              name="atchoumName"
              required={true}
              fullWidth={true}
              id="firstNameAtchoum"
              label="Prenom d'acthoum"
              variant="standard"
              value={formAtchoum.atchoumName}
            />
          </div>
        </div>
        <div className="wrapperBtn">
          <Button disabled={disableBtn} type="submit" variant="contained">Valider</Button>
        </div>
      </form>
      {displayErrorModal &&
        <Dialog
          open={displayErrorModal}
          onClose={() => setDisplayErrorModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            Impossible d'envoyer le formulaire
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bon, zetes sympa les zamis. Mais vous avez le droit de jouer qu'une seule fois par mail. Sinon, c'est pas
              du jeu hein ^^
            </DialogContentText>
          </DialogContent>
        </Dialog>
      }
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={isSuccess} autoHideDuration={6000}
                onClose={() => setIsSuccess(false)}>
        <Alert variant="filled" severity="success" sx={{width: '100%'}}>
          Vote vote a bien été bien pris en compte
        </Alert>
      </Snackbar>
    </>
  )
};

export default Form;

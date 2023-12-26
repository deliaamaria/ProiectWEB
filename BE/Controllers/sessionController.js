import { Session } from '../models/session';


// Crearea a unei sesiuni
const createSession = async () => {
  try {

    console.log('Sesiune creată cu succes:');
  } catch (error) {
    console.error('Eroare la crearea sesiunii:', error);
  }
};

export {
createSession
}
